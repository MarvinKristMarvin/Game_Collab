import { query } from "../db";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

const authController = {
  signupUser: async (req: Request, res: Response) => {
    console.log("authcontroller");
    const { mail, password, confirmation } = req.body;
    // check if informations are correct or return errors
    if (!mail) {
      return res.json({
        error: "The mail is required",
      });
    }
    if (!password || password.length < 3) {
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
    console.log(hashedPassword);
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
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("login controller");
    const { mail, password } = req.body;
    console.log("login please");
    // find the user by mail
    const data = await query('SELECT * FROM "user" WHERE mail = $1', [mail]);
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
          return res
            .cookie("token", token, { httpOnly: true })
            .json(userWithoutPassword);
        }
      );
    }
    if (!match) {
      return res.json({ error: "Passwords do not match" });
    }
  },
};

export default authController;
