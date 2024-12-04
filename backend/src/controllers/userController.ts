import { query } from "../db";
import { Request, Response } from "express";

const userController = {
  /* GET http://localhost:5000/api/users */
  getAll: async (req: Request, res: Response) => {
    const result = await query('SELECT * FROM "user"', []);
    res.json(result.rows);
    //console.log(result.rows);
  },
  /* GET http://localhost:5000/api/users/filtered?languages=English,French&jobs=Dev&remunerations=Nothing&minAge=25&maxAge=40 */
  getFiltered: async (req: Request, res: Response) => {
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
    res.json(result.rows);
  },
};

export default userController;
