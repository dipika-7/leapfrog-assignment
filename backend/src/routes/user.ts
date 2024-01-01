import { Router } from "express";

import {
  // createUser,
  getUsers,
  getUserById,
  getUserByName,
  // updateUser,
  // deleteUser,
} from "../controller/user";

const router = Router();

// router.get("/", getUsers);
router.get("/", getUserByName);
// router.get("/:id", getUserById);
// router.post("/", createUser);
// router.put("/", updateUser);
// router.delete("/", deleteUser);

export default router;
