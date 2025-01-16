import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";
import path from "path";

//dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

// The pool manages multiple connections to the db, it reuses connections to optimize resource usage
const isProduction = process.env.NODE_ENV === "production";
export const pool = new Pool(
  isProduction
    ? {
        // Use a connection string and ssl for render
        connectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string, 10),
      }
);

// Test the db connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected at:", res.rows[0].now);
  }
});

// Export a function to query the db with optionnal parameters
export const query = (
  queryString: string,
  params?: any[]
): Promise<QueryResult<any>> => {
  return pool.query(queryString, params);
};
