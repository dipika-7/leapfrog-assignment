import { Router } from "express";

import {
  // createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  // updateUser,
  // deleteUser,
} from "../controller/user";

const router = Router();

// router.get("/", getUsers);
router.get("/", getUserByEmail);
// router.get("/:id", getUserById);
// router.post("/", createUser);
// router.put("/", updateUser);
// router.delete("/", deleteUser);

export default router;
