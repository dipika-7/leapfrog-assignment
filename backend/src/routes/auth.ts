import { Router } from "express";
import { signup } from "../controller/auth";

const router = Router();

router.post("/signup", signup);

export default router;
