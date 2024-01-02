import { Router } from "express";

import authRoutes from "./auth";
import taskRoutes from "./task";

import { Auth } from "../middleware/Auth";

const router = Router();

// Mounting the authentication routes
router.use("/auth", authRoutes);

// Mounting the task-related routes
router.use("/tasks", Auth, taskRoutes);

export default router;
