import { Router } from "express";

import authRoutes from "./auth";
import userRoutes from "./user";
import taskRoutes from "./task";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;
