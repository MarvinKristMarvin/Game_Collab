import { Client } from "pg";

// Set up the client (replace with your actual database connection details)
const client = new Client({
  user: "marvin",
  host: "localhost",
  database: "gameheartsdb",
  password: "root",
  port: 5432,
});

client.connect();

// Define the types for parameters, including optional fields
type FilterParams = {
  languages?: string[] | null;
  jobs?: string[] | null;
  remunerations?: string[] | null;
  minAge?: number | null;
  maxAge?: number | null;
};

async function getUsersWithFilters(filters: FilterParams) {
  const query = `
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
        r.name,
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
        (l.name = ANY ($1) OR $1 IS NULL) 
        AND (j.name = ANY ($2) OR $2 IS NULL) 
        AND (rem.type = ANY ($3) OR $3 IS NULL) 
        AND (u.age BETWEEN $4 AND $5 OR ($4 IS NULL AND $5 IS NULL))
    GROUP BY 
        u.id, r.name;
  `;

  // Extract the filter values, or pass null if the filters are not provided
  const { languages, jobs, remunerations, minAge, maxAge } = filters;

  try {
    const res = await client.query(query, [
      languages ?? null, // Use null if no languages are provided
      jobs ?? null, // Use null if no jobs are provided
      remunerations ?? null, // Use null if no remunerations are provided
      minAge ?? null, // Use null if no min age is provided
      maxAge ?? null, // Use null if no max age is provided
    ]);

    console.log(res.rows); // Output the results (users with applied filters)
    return res.rows;
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

// Example usage:
const filters: FilterParams = {
  jobs: ["Artist"], // Filter for jobs
  minAge: 26, // Minimum age
  maxAge: 40, // Maximum age
};

getUsersWithFilters(filters)
  .catch((err) => console.error("Error fetching users:", err))
  .finally(() => client.end());
