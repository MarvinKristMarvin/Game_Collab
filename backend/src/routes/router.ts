import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import wrapper from "../middlewares/wrapper";

const router = express.Router();

// API
router.get("/api/users", wrapper(userController.getAll));
router.get("/api/users/filtered", wrapper(userController.getFiltered));
router.patch("/api/user/:id", wrapper(userController.updateUser));

// AUTHENTICATION
router.post("/signup", wrapper(authController.signupUser));
router.post("/login", wrapper(authController.loginUser));
router.post("/logout", wrapper(authController.logoutUser));

export default router;
