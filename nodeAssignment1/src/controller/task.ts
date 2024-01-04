import { Request, Response, NextFunction } from "express";

import * as taskService from "../service/task";

import { GLOBALVARS } from "../constant/statusCode";
import { GetAllTasksQuery } from "../interface/task";
import "../util/custom";

/**
 * Handles the addition of a new task.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const addTask = async (req: any, res: Response, next: NextFunction) => {
  const body = req.body;
  body.createdBy = req.user.id;
  await taskService
    .createTask(body)
    .then((result) => {
      if (!result) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: "Fail to add",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Successfully added",
          data: result,
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Handles listing tasks by user ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const listOfTaskByUserId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const userid = req.user.id;
  await taskService
    .getTaskListByUserId(query as unknown as GetAllTasksQuery, userid)
    .then((result) => {
      if (!result) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: "Fail to list",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Successfully listed",
          data: result,
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Handles listing a task by its ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const listOfTaskById = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const userId = req.user.id;
  await taskService
    .getTaskById(id, userId)
    .then((result) => {
      if (!result) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: "Fail to list",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Successfully listed",
          data: result,
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Handles listing tasks by status.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const listOfTaskByStatus = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const statusMappings: Record<string, boolean> = {
    true: true,
    false: false,
  };
  const data = statusMappings[req.params.status];
  const user = req.user.id;
  await taskService
    .getTaskListByStatus(data, user, query)
    .then((result) => {
      if (!result) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: "Fail to list",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Successfully listed",
          data: result,
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Handles updating a task by its ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const updateTask = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const data = req.body;
  data.created_by = req.user.id;
  await taskService
    .updateTask(id, data)
    .then((result) => {
      if (!result) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: "Fail to update",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Successfully updated",
          data: result,
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Handles updating a task's status by its ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const updateTaskStatus = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const data = req.body;
  data.created_by = req.user.id;
  await taskService
    .updateTaskStatus(id, data)
    .then((result) => {
      if (!result) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: "Fail to update",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Successfully updated",
          data: result,
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Handles deleting a task by its ID.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const deleteTask = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  const id = req.params.id;
  await taskService
    .deleteTask(id, userId)
    .then((result) => {
      if (!result) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: "Fail to remove",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Successfully removed",
        });
      }
    })
    .catch((e) => next(e));
};
