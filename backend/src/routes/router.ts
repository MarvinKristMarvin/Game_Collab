import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import wrapper from "../middlewares/wrapper";
import authorization from "../middlewares/authorization";

const router = express.Router();

// Get all users
router.get("/api/users", wrapper(userController.getAll));
// Get filtered users
router.get("/api/users/filtered", wrapper(userController.getFiltered));
// Patch authenticated user
router.patch(
  "/api/user/:id",
  authorization,
  wrapper(userController.updateUser)
);
// Delete authenticated user
router.delete(
  "/api/user/:id",
  authorization,
  wrapper(userController.deleteUser)
);
// Signup
router.post("/signup", wrapper(authController.signupUser));
// Login
router.post("/login", wrapper(authController.loginUser));
// Logout
router.post("/logout", wrapper(authController.logoutUser));

export default router;
