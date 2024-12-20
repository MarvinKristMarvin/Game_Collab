import { warn } from "console";
import { query, pool } from "../db";
import { Request, Response } from "express";

const userController = {
  /* GET http://localhost:5000/api/users */
  getAll: async (req: Request, res: Response) => {
    const result = await query('SELECT * FROM "user"', []);
    return res.json(result.rows);
    //console.log(result.rows);
  },
  /* GET http://localhost:5000/api/users/filtered?languages=English,French&jobs=Dev&remunerations=Nothing&minAge=25&maxAge=40 */
  getFiltered: async (req: Request, res: Response) => {
    const cookies = req.headers.cookie;

    const languages = req.query.languages
      ? (req.query.languages as string).split(",")
      : null;
    const jobs = req.query.jobs ? (req.query.jobs as string).split(",") : null;
    const remunerations = req.query.remunerations
      ? (req.query.remunerations as string).split(",")
      : null;
    const minAge = req.query.minAge
      ? parseInt(req.query.minAge as string, 10)
      : null;
    const maxAge = req.query.maxAge
      ? parseInt(req.query.maxAge as string, 10)
      : null;
    const result = await query(
      `
  WITH filtered_users AS (
  SELECT 
      u.id
  FROM 
      "user" u
  LEFT JOIN "user_language" ul ON u.id = ul.user_id
  LEFT JOIN "language" l ON ul.language_id = l.id
  LEFT JOIN "user_job" uj ON u.id = uj.user_id
  LEFT JOIN "job" j ON uj.job_id = j.id
  LEFT JOIN "user_remuneration" ur ON u.id = ur.user_id
  LEFT JOIN "remuneration" rem ON ur.remuneration_id = rem.id
  WHERE 
      (l.name = ANY ($1) OR $1 IS NULL)
      AND (j.name = ANY ($2) OR $2 IS NULL)
      AND (rem.type = ANY ($3) OR $3 IS NULL)
      AND (u.age BETWEEN $4 AND $5 OR ($4 IS NULL AND $5 IS NULL))
)
SELECT 
    u.id,
    u.name,
    u.mail,
    u.age,
    u.available,
    u.description,
    u.portfolio_url,
    u.profile_mail,
    u.created_at,
    u.updated_at,
    r.name AS role,
    STRING_AGG(DISTINCT j.name, ', ') AS jobs,
    STRING_AGG(DISTINCT l.name, ', ') AS languages,
    STRING_AGG(DISTINCT rem.type, ', ') AS remunerations
FROM 
    "user" u
LEFT JOIN "role" r ON u.role = r.id
LEFT JOIN "user_job" uj ON u.id = uj.user_id
LEFT JOIN "job" j ON uj.job_id = j.id
LEFT JOIN "user_language" ul ON u.id = ul.user_id
LEFT JOIN "language" l ON ul.language_id = l.id
LEFT JOIN "user_remuneration" ur ON u.id = ur.user_id
LEFT JOIN "remuneration" rem ON ur.remuneration_id = rem.id
WHERE 
    u.id IN (SELECT id FROM filtered_users)
GROUP BY 
    u.id, r.name;
  `,
      [languages, jobs, remunerations, minAge, maxAge]
    );
    return res.json(result.rows);
  },
  // updateUser
  /* PATCH http://localhost:5000/api/users/:id */
  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;

    const warnings = [];

    // Data verification, for warning purposes, still update the user, but don't make him available if warnings
    if (!req.body.name || req.body.name.length < 2) {
      warnings.push("Enter a proper name");
    }
    if (!req.body.age || req.body.age < 15 || req.body.age > 80) {
      warnings.push("Age must be between 15 and 80");
    }
    if (
      !req.body.languages ||
      req.body.languages.length < 1 ||
      req.body.languages.length > 4
    ) {
      warnings.push("Choose 1 to 4 languages");
    }
    if (
      !req.body.jobs ||
      req.body.jobs.length < 1 ||
      req.body.jobs.length > 8
    ) {
      warnings.push("Choose 1 to 8 jobs");
    }
    if (!req.body.remunerations || req.body.remunerations.length < 1) {
      warnings.push("Choose 1 to 4 remunerations");
    }
    if (!req.body.description) {
      warnings.push("Enter a description");
    } else {
      if (req.body.description.length < 10) {
        warnings.push("Enter a real description");
      }
      if (req.body.description.length > 2000) {
        warnings.push(
          "Your description has to be less than 2000 characters, it currently has " +
            req.body.description.length +
            " characters"
        );
      }
    }
    if (
      !req.body.profile_mail ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
        req.body.profile_mail
      )
    ) {
      warnings.push("Enter a valid mail");
    }

    const authenticatedUserId = res.locals.user.id; // Extracted from the token by the middleware
    console.log(authenticatedUserId);

    if (authenticatedUserId !== Number(id)) {
      return res.status(403).json({
        error:
          "You are not authorized to update this account. param ID is not matching with jwt ID",
      });
    }
    const patchData = req.body;

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

      // Update user fields if there are any
      if (Object.keys(userFields).length > 0) {
        const keys = Object.keys(userFields);
        const values = Object.values(userFields);
        const setClause = keys
          .map((key, index) => `"${key}" = $${index + 1}`)
          .join(", ");

        // Update the user fields in the database
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

          // Retrieve IDs for the provided names
          const idsResult = await query(
            `
            SELECT id, ${nameField} FROM "${table}"
            WHERE ${nameField} = ANY ($1);
            `,
            [uniqueValues]
          );

          const ids = idsResult.rows.map((row) => row.id);

          if (ids.length !== uniqueValues.length) {
            throw new Error(
              `Some ${column} names are invalid: ${uniqueValues.filter(
                (value) =>
                  !idsResult.rows.some((row) => row[nameField] === value)
              )}`
            );
          }

          // Delete existing relationships
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

      // Handle jobs, remunerations, and languages
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
  deleteUser: async (req: Request, res: Response) => {
    console.log("delete user controller");
    const { id } = req.params;
    console.log(Number(id));
    const authenticatedUserId = res.locals.user.id; // Extracted from the token by the middleware
    console.log(authenticatedUserId);

    if (authenticatedUserId !== Number(id)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this account." });
    }

    // need to separate the queries for a transaction in psql
    const client = await pool.connect(); // Get a client from the pool
    try {
      await client.query("BEGIN"); // Start transaction

      // Perform all deletions in the correct order
      await client.query(`DELETE FROM user_job WHERE user_id = $1`, [id]);
      await client.query(`DELETE FROM user_language WHERE user_id = $1`, [id]);
      await client.query(`DELETE FROM user_remuneration WHERE user_id = $1`, [
        id,
      ]);
      const userDeleteResult = await client.query(
        `DELETE FROM "user" WHERE id = $1`,
        [id]
      );

      if (userDeleteResult.rowCount === 0) {
        // If no user was deleted, rollback the transaction
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "User not found" });
      }

      await client.query("COMMIT"); // Commit transaction
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      await client.query("ROLLBACK"); // Rollback transaction on error
      console.error(error);
      return res.status(500).json({ error: "Failed to delete user." });
    } finally {
      client.release(); // Release the client back to the pool
    }
  },
};

export default userController;
