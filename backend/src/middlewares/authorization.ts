import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Authorization middleware, checks if the user has a valid token, if so pass it to the next middleware or route handler, else log "invalid or expired token"
const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return next({ status: 401, message: "Unauthorized or expired ?" });
  }
  try {
    // Decode the token, and store it in res.locals.user, making it accessible in all middlewares and route handlers throughout the lifecycle of the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.locals.user = decoded;
    /* 
    It will have this structure =>
    res.locals.user: {
      "mail": "mymail@gmail.com",
      "id": 523,
      "role": 2,
      "iat": 1734644948, (Issued At Timestamp)
      "exp": 1734648548  (Expiration Timestamp)
    } 
    */
    // Go to the next middleware or route handler
    next();
  } catch (error) {
    return next({ status: 401, message: "Invalid or expired token" });
  }
};

export default authorization;
