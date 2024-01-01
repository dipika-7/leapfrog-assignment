import { ITask } from "../interface/task";

import * as Task from "../model/task";

export const createTask = async (data: ITask) => {
  return Task.createTask(data);
};

export const getTaskList = async () => {
  return Task.getTaskList();
};

export const getTaskById = async (id: string) => {
  return Task.getTaskById(id);
};

export const getTaskListByStatus = async (status: boolean) => {
  return Task.getTaskListByStatus(status);
};

export const updateTaskStatus = async (id: string, status: boolean) => {
  return Task.updateTaskStatus(id, status);
};

export const updateTask = async (id: string, data: ITask) => {
  return Task.updateTask(id, data);
};

export const deleteTask = async (id: string) => {
  return Task.deleteTask(id);
};
