import { Request, Response, NextFunction } from "express";

export default (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal server error, try again later.");
    }
  };
};
