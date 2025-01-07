import { query, pool } from "../db";
import { Request, Response } from "express";
import validator from "validator";

const userController = {
  // Get filtered users, all users by default (DOMAIN/api/users/filtered?languages=English,French&jobs=Dev&remunerations=Nothing&minAge=25&maxAge=40)
  getFiltered: async (req: Request, res: Response) => {
    // If the language parameter exists in the query string, split it into an array and sanitize each element, else it is null
    const languages = req.query.languages
      ? (req.query.languages as string)
          .split(",")
          .map((lang) => validator.trim(validator.escape(lang)))
      : null;
    const jobs = req.query.jobs
      ? (req.query.jobs as string)
          .split(",")
          .map((job) => validator.trim(validator.escape(job)))
      : null;
    const remunerations = req.query.remunerations
      ? (req.query.remunerations as string)
          .split(",")
          .map((rem) => validator.trim(validator.escape(rem)))
      : null;
    const minAge = req.query.minAge
      ? validator.isInt(req.query.minAge as string)
        ? parseInt(req.query.minAge as string, 10)
        : null
      : null;

    const maxAge = req.query.maxAge
      ? validator.isInt(req.query.maxAge as string)
        ? parseInt(req.query.maxAge as string, 10)
        : null
      : null;

    // Validate logical correctness of minAge and maxAge
    if (minAge !== null && maxAge !== null && minAge > maxAge) {
      return res
        .status(400)
        .json({ error: "minAge cannot be greater than maxAge" });
    }
    // Get all users with the selected filters
    const result = await query(
      `
      WITH filtered_users AS (
      SELECT 
      "user".id
      FROM 
      "user"
      LEFT JOIN "user_language" ON "user".id = "user_language".user_id
      LEFT JOIN "language" ON "user_language".language_id = "language".id
      LEFT JOIN "user_job" ON "user".id = "user_job".user_id
      LEFT JOIN "job" ON "user_job".job_id = "job".id
      LEFT JOIN "user_remuneration" ON "user".id = "user_remuneration".user_id
      LEFT JOIN "remuneration" ON "user_remuneration".remuneration_id = "remuneration".id
      WHERE 
      ("language".name = ANY ($1) OR $1 IS NULL)
      AND ("job".name = ANY ($2) OR $2 IS NULL)
      AND ("remuneration".type = ANY ($3) OR $3 IS NULL)
      AND ("user".age BETWEEN $4 AND $5 OR ($4 IS NULL AND $5 IS NULL))
      AND "user".available = TRUE)
      SELECT 
      "user".id,
      "user".name,
      "user".age,
      "user".available,
      "user".description,
      "user".portfolio_url,
      "user".profile_mail,
      "user".created_at,
      "user".updated_at,
      STRING_AGG(DISTINCT "job".name, ', ') AS jobs,
      STRING_AGG(DISTINCT "language".name, ', ') AS languages,
      STRING_AGG(DISTINCT "remuneration".type, ', ') AS remunerations
      FROM 
      "user"
      LEFT JOIN "user_job" ON "user".id = "user_job".user_id
      LEFT JOIN "job" ON "user_job".job_id = "job".id
      LEFT JOIN "user_language" ON "user".id = "user_language".user_id
      LEFT JOIN "language" ON "user_language".language_id = "language".id
      LEFT JOIN "user_remuneration" ON "user".id = "user_remuneration".user_id
      LEFT JOIN "remuneration" ON "user_remuneration".remuneration_id = "remuneration".id
      WHERE 
      "user".id IN (SELECT id FROM filtered_users)
      GROUP BY 
      "user".id
      ORDER BY 
      "user".updated_at DESC;
      `,
      [languages, jobs, remunerations, minAge, maxAge]
    );
    return res.json(result.rows);
  },

  // Update a user
  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const warnings = [];
    // Sanitize inputs (remove potential risky characters from strings, avoiding XSS attacks)
    const sanitizedData = {
      // Trim removes whitespaces, escape removes special characters like < > " ' to prevent XSS
      name: validator.trim(validator.escape(req.body.name || "")),
      age: req.body.age ? parseInt(req.body.age, 10) : undefined,
      languages: Array.isArray(req.body.languages)
        ? req.body.languages.map((lang: string) =>
            validator.trim(validator.escape(lang))
          )
        : [],
      jobs: Array.isArray(req.body.jobs)
        ? req.body.jobs.map((job: string) =>
            validator.trim(validator.escape(job))
          )
        : [],
      remunerations: Array.isArray(req.body.remunerations)
        ? req.body.remunerations.map((rem: string) =>
            validator.trim(validator.escape(rem))
          )
        : [],
      description: validator.trim(validator.escape(req.body.description || "")),
      profile_mail: validator.trim(req.body.profile_mail || ""), // The regex will protect from XSS
      portfolio_url: validator.trim(
        validator.escape(req.body.portfolio_url || "")
      ),
      available: false,
    };
    // Data verification for warning purposes, still update the user, but make him available only if no warnings
    if (!sanitizedData.name || sanitizedData.name.length < 2) {
      warnings.push("Enter a proper name");
    }
    if (
      sanitizedData.age === undefined ||
      !validator.isInt(String(sanitizedData.age), { min: 15, max: 80 })
    ) {
      warnings.push("Age must be between 15 and 80");
    }
    if (
      sanitizedData.languages.length < 1 ||
      sanitizedData.languages.length > 4
    ) {
      warnings.push("Choose 1 to 4 languages");
    }

    if (sanitizedData.jobs.length < 1 || sanitizedData.jobs.length > 8) {
      warnings.push("Choose 1 to 8 jobs");
    }

    if (sanitizedData.remunerations.length < 1) {
      warnings.push("Choose 1 to 4 remunerations");
    }

    if (!sanitizedData.description) {
      warnings.push("Enter a description");
    } else if (sanitizedData.description.length < 10) {
      warnings.push("Enter a real description");
    } else if (sanitizedData.description.length > 2000) {
      warnings.push(
        `Your description has to be less than 2000 characters, it currently has ${sanitizedData.description.length} characters`
      );
    }

    if (!validator.isEmail(sanitizedData.profile_mail)) {
      warnings.push("Enter a valid email");
    }
    // Get the user id from his jwt token (stored in res.locals.user in authorization middleware)
    const authenticatedUserId = res.locals.user.id;
    // Return an error if the jwt id doesn't match the param id
    if (authenticatedUserId !== Number(id)) {
      return res.status(403).json({
        error:
          "You are not authorized to update this account. param ID is not matching with jwt ID",
      });
    }
    // If req.body is empty, return an error
    const patchData = sanitizedData;
    if (!patchData || Object.keys(patchData).length === 0) {
      return res.status(400).json({ error: "No changes are sent" });
    }
    try {
      const { jobs, remunerations, languages, ...userFields } = patchData;
      if (warnings.length === 0) {
        userFields.available = true;
      } else {
        userFields.available = false;
      }
      // Update db user fields if there are any in the patchData
      if (Object.keys(userFields).length > 0) {
        // Keys = keys of the userFields object
        const keys = Object.keys(userFields); // ["name", "age"]
        const values = Object.values(userFields); // ["John", 25]
        // SetClause = "name" = $1, "age" = $2...
        const setClause = keys
          .map((key, index) => `"${key}" = $${index + 1}`)
          .join(", ");
        // Update the user fields in the database, WHERE id = req.params.id
        const result = await query(
          `
          UPDATE "user"
          SET ${setClause}, updated_at = NOW()
          WHERE id = $${keys.length + 1}
          RETURNING *;
          `,
          [...values, id]
        );
        if (result.rowCount === 0) {
          return res
            .status(404)
            .json({ error: "User not found for the update" });
        }
      }
      // Helper function to update relational data
      const updateRelationalData = async (
        table: string,
        column: string,
        valuesArray: string[]
      ) => {
        if (Array.isArray(valuesArray) && valuesArray.length > 0) {
          // Remove duplicate values
          const uniqueValues = [...new Set(valuesArray)];
          // Change the name field for the remuneration table
          let nameField = "name";
          if (table === "remuneration") {
            nameField = "type";
          }
          // Retrieve ids for the provided names and table (id of "Artist" and "Dev" in job table)
          const idsResult = await query(
            `
            SELECT id, ${nameField} FROM "${table}"
            WHERE ${nameField} = ANY ($1);
            `,
            [uniqueValues]
          );
          // Put those ids in an array
          const ids = idsResult.rows.map((row) => row.id);
          // If the number of ids doesn't match the number of unique values, throw an error => exemple Error: Some jobs names are invalid: ["InvalidJob"]
          if (ids.length !== uniqueValues.length) {
            throw new Error(
              `Some ${column} names are invalid: ${uniqueValues.filter(
                (value) =>
                  !idsResult.rows.some((row) => row[nameField] === value)
              )}`
            );
          }
          // Delete existing relationships before inserting the updated ones
          await query(
            `
            DELETE FROM "user_${column}"
            WHERE user_id = $1;
            `,
            [id]
          );
          // Insert new relationships
          const insertValues = ids
            .map((itemId) => `(${id}, ${itemId})`)
            .join(", ");
          await query(
            `
            INSERT INTO "user_${column}" (user_id, ${column}_id)
            VALUES ${insertValues}
            ON CONFLICT (user_id, ${column}_id) DO NOTHING;
            `
          );
        } else {
          // If no values are provided, delete all relationships
          await query(
            `
            DELETE FROM "user_${column}"
            WHERE user_id = $1;
            `,
            [id]
          );
        }
      };
      // Run the helper function for each association table: jobs, remunerations, and languages to update the relational data
      await updateRelationalData("job", "job", jobs);
      await updateRelationalData("remuneration", "remuneration", remunerations);
      await updateRelationalData("language", "language", languages);
      return res.json({
        warnings,
        message: "User updated successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: "An error occurred", details: error.message });
      } else {
        return res
          .status(500)
          .json({ error: "An error occurred", details: "Unknown error" });
      }
    }
  },

  // Delete user
  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    // Id from the jwt token
    const authenticatedUserId = res.locals.user.id;
    if (authenticatedUserId !== Number(id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this account." });
    }
    // Need to separate the queries for a transaction in PSQL
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start transaction
      // Perform all deletions in the correct order (association deletions first, then user deletion)
      await client.query(`DELETE FROM user_job WHERE user_id = $1`, [id]);
      await client.query(`DELETE FROM user_language WHERE user_id = $1`, [id]);
      await client.query(`DELETE FROM user_remuneration WHERE user_id = $1`, [
        id,
      ]);
      const userDeleteResult = await client.query(
        `DELETE FROM "user" WHERE id = $1`,
        [id]
      );
      // If no user was deleted, rollback the transaction
      if (userDeleteResult.rowCount === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "User not found" });
      }
      // Commit transaction if all deletions were successful
      await client.query("COMMIT");
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      // Rollback transaction on error
      await client.query("ROLLBACK");
      console.error(error);
      return res.status(500).json({ error: "Failed to delete user." });
    } finally {
      // Release the client back to the pool
      client.release();
    }
  },
};

export default userController;
