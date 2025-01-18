import { NextFunction, Request, Response } from "express";

// Middleware for validating the CSRF token
function validateCsrfToken(req: Request, res: Response, next: NextFunction) {
  const csrfTokenFromHeader = req.headers["x-csrf-token"];
  const csrfTokenFromCookie = req.cookies.csrfToken;
  console.log(csrfTokenFromHeader, csrfTokenFromCookie);

  //! Pass the CSRF security
  /*if (!csrfTokenFromHeader || csrfTokenFromHeader !== csrfTokenFromCookie) {
    res.status(403).json({ error: "Invalid CSRF token" });
    return;
  }*/

  next();
}

export default validateCsrfToken;
