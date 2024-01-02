import { ITask, ITaskQuery } from "../interface/task";

import * as Task from "../model/task";
import NotFoundError from "../error/notFoundError";

/**
 * Creates a new task by adding it.
 * @param data - The task details for creation.
 * @returns A promise that resolves to the created task.
 */
export const createTask = async (data: ITask) => {
  return await Task.createTask(data);
};

/**
 * Retrieves the list of all tasks.
 * @returns A promise that resolves to an array of tasks.
 */
export const getTaskList = async () => {
  return await Task.getTaskList();
};

/**
 * Retrieves a task by its unique identifier.
 * @param id - The unique identifier of the task.
 * @returns A promise that resolves to the task with the specified ID.
 */
export const getTaskById = async (id: string, userId: string) => {
  const task = await Task.getTaskById(id, userId);
  if (!task) {
    throw new NotFoundError(`Task with id ${id} Not Found`);
  }
  return task;
};

/**
 * Retrieves a list of tasks associated with a specific user.
 * @param id - The unique identifier of the user.
 * @returns A promise that resolves to an array of tasks belonging to the user.
 */
export const getTaskListByUserId = async (id: string, query: ITaskQuery) => {
  const task = await Task.getTaskListByUserId(id, query);
  if (!task || task.length <= 0) {
    throw new NotFoundError(`Task with id ${id} Not Found`);
  }
  return task;
};

/**
 * Retrieves a list of tasks based on their completion status and user association.
 * @param status - The completion status of the tasks (true or false).
 * @param user - The unique identifier of the user.
 * @returns A promise that resolves to an array of tasks with the specified completion status and user association.
 */
export const getTaskListByStatus = async (status: boolean, user: string) => {
  const task = await Task.getTaskListByStatus(status, user);
  console.log(task);
  if (!task || task.length <= 0) {
    throw new NotFoundError(`Task Not Found`);
  }
  return task;
};

/**
 * Updates the completion status of a task .
 * @param id - The unique identifier of the task.
 * @param status - The new completion status of the task.
 * @returns A promise that resolves to the updated task.
 */
export const updateTaskStatus = async (
  id: string,
  data: { completed: boolean; userId: string }
) => {
  return await Task.updateTaskStatus(id, data);
};

/**
 * Updates the details of a task.
 * @param id - The unique identifier of the task.
 * @param data - The updated task details.
 * @returns A promise that resolves to the updated task.
 */
export const updateTask = async (id: string, data: ITask) => {
  const task = await Task.updateTask(id, data);
  if (!task) {
    throw new NotFoundError(`Task with id ${id} Not Found`);
  }
  return task;
};

/**
 * Deletes a task.
 * @param id - The unique identifier of the task.
 * @returns A promise that resolves to the updated list of tasks after deletion.
 */
export const deleteTask = async (id: string, userId: string) => {
  const task = await Task.deleteTask(id, userId);
  if (!task) {
    throw new NotFoundError(`Task with id ${id} Not Found`);
  }
  return task;
};
