import { query } from "../db";
import { Request, Response } from "express";

const userController = {
  getAll: async (req: Request, res: Response) => {
    const result = await query("SELECT * FROM utilisateur", []);
    res.json(result.rows);
    //console.log(result.rows);
  },
};

export default userController;
