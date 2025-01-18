import { query } from "../db";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import validator from "validator";
import crypto from "crypto";

const authController = {
  // Signup
  signupUser: async (req: Request, res: Response) => {
    // Get these fields from the request body
    const { mail, password, confirmation } = req.body;

    // Check if fields are correct or return toast errors
    if (!mail) {
      return res.json({
        error: "Your email is required",
      });
    }
    // Test the mail regex
    if (!validator.isEmail(mail)) {
      return res.json({
        error: "Your email is not valid",
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
    // Check if the email is already used
    const mailResult = await query('SELECT * FROM "user" WHERE mail = $1', [
      mail,
    ]);
    if (mailResult.rows.length > 0) {
      return res.json({
        error: "This mail is already used",
      });
    }
    // If all informations are good, hash the password
    const hashedPassword = await hashPassword(password);
    // Then create a user in the db
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

  // Login
  loginUser: async (req: Request, res: Response) => {
    console.log("loginUser controller");
    const { mail, password } = req.body;
    // Check if invalid email
    if (!validator.isEmail(mail)) {
      return res.json({
        error: "Invalid email",
      });
    }
    // Find the user using his mail
    const data = await query(
      `
      SELECT 
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
      u.id;
      `,
      [mail]
    );
    const user = data.rows[0];
    if (!user) {
      return res.json({
        error: "No account found with this mail",
      });
    }
    // Check if the sent password matches the database hashed password
    const match = await comparePassword(password, user.password);
    console.log("match : ", match);
    if (match) {
      // Update the updated_at field, serves to show active users first in the browsing profiles page
      try {
        await query(
          `
          UPDATE "user" 
          SET updated_at = CURRENT_TIMESTAMP 
          WHERE mail = $1;
          `,
          [mail]
        );
      } catch (error) {
        console.log(error + "Unable to update user's updated_at");
      }
      const csrfToken = crypto.randomBytes(32).toString("hex");
      console.log("csrfToken", csrfToken);
      // Create a jwt by encoding the user id, mail and role + the jwt secret, set an expiration time
      jwt.sign(
        { mail: user.mail, id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: Number(process.env.JWT_EXPIRATION) },
        (err, token) => {
          if (err) throw err;
          // If successfull, send the token to the client in a cookie named "token" and send user data back as a response without the password
          const { password, ...userWithoutPassword } = user;
          console.log("rescookies");
          console.log("userWithoutPassword", userWithoutPassword);
          // return res.status(200).send("return before cookies");
          return (
            res
              .cookie("token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: process.env.NODE_ENV === "production", // True when in production
                domain: "gamehearts.onrender.com", // Changed from full URL to just domain
                path: "/",
              })
              // Also send the CSRF token
              .cookie("csrfToken", csrfToken, {
                httpOnly: false, // Make the cookie accessible by the frontend
                sameSite: "none",
                secure: process.env.NODE_ENV === "production",
                domain: "gamehearts.onrender.com", // Changed from full URL to just domain
                path: "/",
              })
              .json(userWithoutPassword)
          );
        }
      );
    }
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
  },

  // Logout
  logoutUser: async (req: Request, res: Response) => {
    // Give the "token" an empty value
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // Prevent CSRF
      domain: "gamehearts.onrender.com", // Changed from full URL to just domain
      path: "/",
      expires: new Date(0), // Tells the browser to remove the cookie
    });
    return res.status(200).send("Logged out and cookie cleared.");
  },
};

export default authController;
