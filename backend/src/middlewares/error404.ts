import { Request, Response } from "express";

// Return a response with a 404 status code and a message
export default (req: Request, res: Response) => {
  res.status(404).json("Resource not found");
};
