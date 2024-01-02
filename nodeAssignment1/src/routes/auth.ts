import { Router } from "express";

import {
  signup,
  login,
  generateRefreshToken,
  logout,
} from "../controller/auth";
import { validateReqBody } from "../middleware/validator";
import {
  loginSchema,
  refreshTokenSchema,
  signUpSchema,
} from "../schema/userSchema";

// Create an instance of the Express Router
const router = Router();

// Route for user signup
router.post("/signup", validateReqBody(signUpSchema), signup);

// Route for user login
router.post("/login", validateReqBody(loginSchema), login);

// Route for generating a refresh token
router.post(
  "/refresh",
  validateReqBody(refreshTokenSchema),
  generateRefreshToken
);

//Route for user logout
router.post("/logout", validateReqBody(refreshTokenSchema), logout);

export default router;
