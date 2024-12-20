import { query } from "../db";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

const authController = {
  signupUser: async (req: Request, res: Response) => {
    const { mail, password, confirmation } = req.body;
    // check if informations are correct or return errors
    if (!mail) {
      // send error to the front toast
      return res.json({
        error: "Your mail is required",
      });
    }
    // if not a mail string return error
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(mail)) {
      return res.json({
        error: "Your mail is not valid",
      });
    }
    if (!password || password.length < 8) {
      return res.json({
        error: "Your password should have at least 8 characters",
      });
    }
    if (password !== confirmation) {
      return res.json({
        error: "Your password confirmation does not match your password.",
      });
    }
    // check if email already taken
    const mailResult = await query('SELECT * FROM "user" WHERE mail = $1', [
      mail,
    ]);
    if (mailResult.rows.length > 0) {
      return res.json({
        error: "This mail is already used",
      });
    }
    // if all informations are good, hash password then create a user in db and return it
    const hashedPassword = await hashPassword(password);
    const newUserResult = await query(
      `
        INSERT INTO "user" (mail, password) 
        VALUES ($1, $2)
        RETURNING id, mail;
      `,
      [mail, hashedPassword]
    );
    // Return the created user (excluding the password)
    return res.json(newUserResult.rows[0]);
  },
  loginUser: async (req: Request, res: Response) => {
    const cookies = req.headers.cookie;
    const { mail, password } = req.body;
    // find the user by mail
    const data = await query(
      `SELECT 
  u.*,
  ARRAY_AGG(DISTINCT j.name) AS jobs,
    ARRAY_AGG(DISTINCT r.type) AS remunerations,
    ARRAY_AGG(DISTINCT l.name) AS languages
FROM 
  "user" u
  LEFT JOIN "user_job" uj ON u.id = uj.user_id
  LEFT JOIN "job" j ON uj.job_id = j.id
  LEFT JOIN "user_remuneration" ur ON u.id = ur.user_id
  LEFT JOIN "remuneration" r ON ur.remuneration_id = r.id
  LEFT JOIN "user_language" ul ON u.id = ul.user_id
  LEFT JOIN "language" l ON ul.language_id = l.id
WHERE 
  u.mail = $1
GROUP BY 
  u.id;`,
      [mail]
    );
    const user = data.rows[0];
    // if no user found tell the front
    if (!user) {
      return res.json({
        error: "No account found with this mail",
      });
    }
    // check if the given password matches the hashed password
    const match = await comparePassword(password, user.password);
    if (match) {
      // creates a jwt by giving user data to encode
      jwt.sign(
        { mail: user.mail, id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          // if successfull, send token to client in a cookie named token and send user data back as a response without the password
          const { password, ...userWithoutPassword } = user;
          return (
            res
              .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
              })
              /* res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "None", // Allows cross-origin cookies
                    secure: true,    // Cookies are only sent over HTTPS
                  }); FOR PRODUCTION*/
              .json(userWithoutPassword)
          );
        }
      );
    }
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
  },

  logoutUser: async (req: Request, res: Response) => {
    res.cookie("token", "", {
      httpOnly: true, // Ensure the cookie remains HttpOnly
      /*secure: true, // Use this in production for HTTPS*/
      sameSite: "strict", // Prevent CSRF
      expires: new Date(0), // Set the cookie to expire in the past
    });
    return res.status(200).send("Logged out and cookie cleared.");
  },
};

export default authController;
