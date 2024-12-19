import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import wrapper from "../middlewares/wrapper";
import authorization from "../middlewares/authorization";

const router = express.Router();

// API
router.get("/api/users", wrapper(userController.getAll));
router.get("/api/users/filtered", wrapper(userController.getFiltered));
router.patch("/api/user/:id", wrapper(userController.updateUser));
router.delete(
  "/api/user/:id",
  authorization,
  wrapper(userController.deleteUser)
);

// AUTHENTICATION
router.post("/signup", wrapper(authController.signupUser));
router.post("/login", wrapper(authController.loginUser));
router.post("/logout", wrapper(authController.logoutUser));

export default router;
