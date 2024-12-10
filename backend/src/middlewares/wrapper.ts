import { Request, Response, NextFunction } from "express";

export default (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  console.log("in wrapper");
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("in wrapper try");
      await controller(req, res, next);
    } catch (err) {
      console.log("in wrapper catch");
      console.error(err);
      res.status(500).json("Internal server error, try again later.");
    }
  };
};
