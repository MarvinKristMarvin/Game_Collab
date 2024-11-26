import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/api/users", userController.getAll);

export default router;
