import { query } from "../db";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

const authController = {
  signupUser: async (req: Request, res: Response) => {
    try {
      console.log("authcontroller");
      const { mail, password, confirmation } = req.body;
      // check if informations are correct or return errors
      if (!mail) {
        return res.json({
          error: "The mail is required",
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
      const mailCheckQuery = `SELECT * FROM "user" WHERE mail = $1`;
      // const result = await query('SELECT * FROM "user" WHERE mail = $1', [email]);
      const mailResult = await query(mailCheckQuery, [mail]);
      if (mailResult.rows.length > 0) {
        return res.json({
          error: "This mail is already used",
        });
      }
      // if all informations are good, hash password then create a user in db and return it
      const hashedPassword = await hashPassword(password);
      const insertUserQuery = `
        INSERT INTO "user" (mail, password) 
        VALUES ($1, $2) 
        RETURNING id, mail;
      `;
      const newUserResult = await query(insertUserQuery, [
        mail,
        hashedPassword,
      ]);

      // Return the created user (excluding the password)
      return res.json(newUserResult.rows[0]);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "An error occurred during signup." });
    }
  },
};

export default authController;
