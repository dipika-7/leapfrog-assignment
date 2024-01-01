import { Router } from "express";
import {
  signup,
  login,
  generateRefreshToken,
  logout,
} from "../controller/auth";

// Create an instance of the Express Router
const router = Router();

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

// Route for generating a refresh token
router.post("/refresh", generateRefreshToken);

//Route for user logout
router.post("/logout", logout);

export default router;
