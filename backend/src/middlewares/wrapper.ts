import { Request, Response, NextFunction } from "express";

export default (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  console.log("wrapper");
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("wrapper2");
    try {
      console.log("wrapper try");
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
