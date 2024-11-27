import express from "express";
import userController from "../controllers/userController";
import wrapper from "../middlewares/wrapper";

const router = express.Router();

/* port 5000 */
router.get("/api/users", wrapper(userController.getAll));
router.get("/api/users/filtered", wrapper(userController.getFiltered));

export default router;
