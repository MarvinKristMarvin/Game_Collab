import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Export a function which takes a controller as an argument (wrapper), and returns a new function
export default (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the jwt token from the cookie
      const token = req.cookies.token;
      // If the jwt token exists, refresh it if it is still valid
      if (token) {
        try {
          // Decode the existing token
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
          ) as jwt.JwtPayload;
          // Generate a new token with the decoded id, mail and role then refresh its expiration time
          const newToken = jwt.sign(
            { id: decoded.id, mail: decoded.mail, role: decoded.role },
            process.env.JWT_SECRET!,
            { expiresIn: Number(process.env.JWT_EXPIRATION) }
          );
          // Set a HTTP-only cookie named "token" with the value of the new token (secure because not accessible by javascript, protecting against XSS)
          res.cookie("token", newToken, {
            httpOnly: true,
            sameSite: "none", // Set to "strict" for more security
            secure: true, // Always set to true in production, to send cookies only over HTTPS (we use HTTP in development)
            maxAge: Number(process.env.JWT_EXPIRATION) * 1000, // 1800 * 1000 = 30 minutes
          });
        } catch (err) {
          console.log("Token invalid or expired");
        }
      }

      // Call the controller
      await controller(req, res, next);
    } catch (err) {
      // If error is an object with a status and a message, respond with the error status and message, otherwise error 500 internal server error
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
