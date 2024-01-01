import { Request, Response } from "express";
import * as fs from "fs";

import * as taskService from "../service/task";

import { GLOBALVARS } from "../constant/statusCode";

export const addTask = async (req: Request, res: Response) => {
  const body = req.body;
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
        });
      }
    })
    .catch((e) => e);
};

export const listOfTask = async (req: Request, res: Response) => {
  await taskService
    .getTaskList()
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
    .catch((e) => e);
};

export const listOfTaskById = async (req: Request, res: Response) => {
  const id = req.params.id;
  await taskService
    .getTaskById(id)
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
    .catch((e) => e);
};

export const listOfTaskByStatus = async (req: Request, res: Response) => {
  const statusMappings: Record<string, boolean> = {
    true: true,
    false: false,
  };
  const data = statusMappings[req.params.status];
  await taskService
    .getTaskListByStatus(data)
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
    .catch((e) => e);
};

export const updateTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
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
    .catch((e) => e);
};

export const updateTaskByStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body.completed;
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
    .catch((e) => e);
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  await taskService
    .deleteTask(id)
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
    .catch((e) => e);
};
