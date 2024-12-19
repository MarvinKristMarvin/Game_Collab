import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in authorization middleware");
  const token = req.cookies.token;

  if (token) {
    console.log("token in authorization middleware");
  }
  if (!token) {
    console.log("not token");
    return next({ status: 401, message: "Unauthorized" });
  }

  try {
    console.log("try in authorization middleware");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // Verify the token

    res.locals.user = decoded;
    console.log(
      "User info in res.locals:",
      JSON.stringify(res.locals.user, null, 2)
    );
    /* res.locals.user: {
  "mail": "a@a",
  "id": 25,
  "role": 2,
  "iat": 1734644948,
  "exp": 1734648548
} */
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("error 2");
    return next({ status: 401, message: "Invalid token" });
  }
};

export default authorization;
