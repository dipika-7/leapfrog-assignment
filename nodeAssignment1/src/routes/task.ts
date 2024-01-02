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
import {
  getTaskQuerySchema,
  idSchema,
  taskSchema,
  updateTaskStatusSchema,
} from "../schema/taskSchema";
import {
  validateReqBody,
  validateReqParam,
  validateReqQuery,
} from "../middleware/validator";

const router = Router();

// Routes for handling task operations
router
  .route("/")
  .get(validateReqQuery(getTaskQuerySchema), listOfTaskByUserId) // Get the list of tasks
  .post(validateReqBody(taskSchema), addTask); // Add a new task

router
  .route("/:id")
  .get(validateReqParam(idSchema), listOfTaskById) // Get a specific task by ID
  .put(validateReqParam(idSchema), validateReqBody(taskSchema), updateTask) // Update a specific task
  .patch(
    validateReqParam(idSchema),
    validateReqBody(updateTaskStatusSchema),
    updateTaskStatus
  ) // Update a specific task's status
  .delete(validateReqParam(idSchema), deleteTask); // Delete a specific task

router.route("/list/:status").get(Auth, listOfTaskByStatus); // Get the list of tasks by status

export default router;
