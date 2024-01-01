import { Router } from "express";

import authRoutes from "./auth";
import taskRoutes from "./task";

const router = Router();

// Mounting the authentication routes
router.use("/auth", authRoutes);

// Mounting the task-related routes
router.use("/tasks", taskRoutes);

export default router;
