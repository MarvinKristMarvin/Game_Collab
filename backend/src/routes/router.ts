import express from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import wrapper from "../middlewares/wrapper";
import authorization from "../middlewares/authorization";
import validateCsrfToken from "../middlewares/validateCsrfToken";

const router = express.Router();

// Get filtered users
router.get("/api/users/filtered", wrapper(userController.getFiltered));
// Patch authenticated user
router.patch(
  "/api/user/:id",
  authorization,
  validateCsrfToken,
  wrapper(userController.updateUser)
);
// Delete authenticated user
router.delete(
  "/api/user/:id",
  authorization,
  validateCsrfToken,
  wrapper(userController.deleteUser)
);
// Signup
router.post("/signup", wrapper(authController.signupUser));
// Login
router.post("/login", wrapper(authController.loginUser));
// Logout
router.post("/logout", wrapper(authController.logoutUser));

export default router;
