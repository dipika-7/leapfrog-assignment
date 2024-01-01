import { Router } from "express";
import {
  addTask,
  listOfTask,
  listOfTaskById,
  listOfTaskByStatus,
  updateTask,
  updateTaskByStatus,
  deleteTask,
} from "../controller/task";
import { Auth } from "../middleware/Auth";

const router = Router();

router.route("/").get(Auth, listOfTask).post(Auth, addTask);

router
  .route("/:id")
  .get(Auth, listOfTaskById)
  .put(Auth, updateTask)
  .patch(Auth, updateTaskByStatus)
  .delete(Auth, deleteTask);

router.route("/list/:status").get(listOfTaskByStatus);

export default router;
