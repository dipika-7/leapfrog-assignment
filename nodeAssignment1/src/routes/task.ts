import { Router } from "express";
import {
  addTask,
  listOfTaskByUserId,
  listOfTaskById,
  listOfTaskByStatus,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controller/task";
import { Auth } from "../middleware/Auth";

const router = Router();

// Routes for handling task operations
router
  .route("/")
  .get(Auth, listOfTaskByUserId) // Get the list of tasks
  .post(Auth, addTask); // Add a new task

router
  .route("/:id")
  .get(Auth, listOfTaskById) // Get a specific task by ID
  .put(Auth, updateTask) // Update a specific task
  .patch(Auth, updateTaskStatus) // Update a specific task's status
  .delete(Auth, deleteTask); // Delete a specific task

router.route("/list/:status").get(Auth, listOfTaskByStatus); // Get the list of tasks by status

export default router;
