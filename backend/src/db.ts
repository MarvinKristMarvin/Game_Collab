import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });
//dotenv.config();

// The pool manages multiple connections to the db, it reuses connections to optimize resource usage
export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
});

// Export a function to query the db with optionnal parameters
export const query = (
  queryString: string,
  params?: any[]
): Promise<QueryResult<any>> => {
  return pool.query(queryString, params);
};
