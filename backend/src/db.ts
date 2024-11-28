import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

/* the pool manages multiple connections to the db, it reuses connections to optimize resource usage */
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

/* const data = await pool.query('SELECT * FROM users WHERE id = $1', [123]) => request with optionnal parameters */
export const query = (
  queryString: string,
  params?: any[]
): Promise<QueryResult<any>> => {
  return pool.query(queryString, params);
};
