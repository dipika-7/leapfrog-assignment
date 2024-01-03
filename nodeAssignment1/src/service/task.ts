import { ITask, ITaskQuery } from "../interface/task";

import TaskModel from "../model/task";
import NotFoundError from "../error/notFoundError";

/**
 * Creates a new task by adding it.
 * @param data - The task details for creation.
 * @returns A promise that resolves to the created task.
 */
export const createTask = async (data: ITask) => {
  return await TaskModel.create(data);
};

/**
 * Retrieves the list of all tasks.
 * @returns A promise that resolves to an array of tasks.
 */
export const getTaskList = async () => {
  return await TaskModel.getAll();
};

/**
 * Retrieves a task by its unique identifier.
 * @param id - The unique identifier of the task.
 * @returns A promise that resolves to the task with the specified ID.
 */
export const getTaskById = async (id: number, userId: number) => {
  const task = await TaskModel.getById(id, userId);
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
export const getTaskListByUserId = async (id: number) => {
  const task = await TaskModel.getByUserId(id);
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
  const task = await TaskModel.getByStatus(status, user);
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
  id: number,
  data: { completed: boolean; userId: string }
) => {
  return await TaskModel.update(id, data);
};

/**
 * Updates the details of a task.
 * @param id - The unique identifier of the task.
 * @param data - The updated task details.
 * @returns A promise that resolves to the updated task.
 */
export const updateTask = async (id: number, data: ITask) => {
  const task = await TaskModel.update(id, data);
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
export const deleteTask = async (id: number, userId: number) => {
  const task = await TaskModel.delete(id, userId);
  if (!task) {
    throw new NotFoundError(`Task with id ${id} Not Found`);
  }
  return task;
};
