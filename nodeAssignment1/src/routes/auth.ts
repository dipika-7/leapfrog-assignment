import { Router } from "express";
import { signup, login, generateRefreshToken } from "../controller/auth";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/refresh", generateRefreshToken);

export default router;
