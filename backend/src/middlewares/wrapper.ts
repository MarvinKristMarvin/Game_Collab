import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

export default (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;

      // Refresh the token if it is still valid
      if (token) {
        try {
          // Verify the existing token
          const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

          // Generate a new token with refreshed expiration
          const newToken = jwt.sign(
            { id: decoded.id, mail: decoded.mail, role: decoded.role },
            JWT_SECRET,
            { expiresIn: Number(process.env.JWT_EXPIRATION) } // Set expiration to 10 minutes
          );

          // Set the new token in the HTTP-only cookie
          res.cookie("token", newToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false, // Set to true in production with HTTPS
            maxAge: Number(process.env.JWT_EXPIRATION) * 1000, // 10 minutes
          });
        } catch (err) {
          console.log("Token invalid or expired");
        }
      }

      // Call the controller
      await controller(req, res, next);
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        "message" in err
      ) {
        const status = err.status as number;
        if (!isNaN(status)) {
          res.status(status).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).json("Internal server error, try again later.");
        }
      } else {
        console.error(err);
        res.status(500).json("Internal server error, try again later.");
      }
    }
  };
};
