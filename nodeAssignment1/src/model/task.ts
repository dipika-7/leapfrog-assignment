import fs from "fs/promises";
import { ITask } from "../interface/task";
import { getRandomString } from "../util/utils";
import { ID_LENGTH } from "../constant/constants";

const taskFilePath = "src/constant/task.json";

/**
 * Creates a new task and adds it to the task list.
 * @param data - The task data to be created.
 * @returns A promise that resolves to the created task.
 */
export const createTask = async (data: ITask) => {
  // Read the existing tasks from the file
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));

  // Generate a unique ID for the new task
  data.id = getRandomString(ID_LENGTH);

  // Add the new task to the task list
  tasks.push(data);

  // Update the task list in the JSON file
  await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
  return data;
};

/**
 * Retrieves the list of all tasks.
 * @returns A promise that resolves to the list of tasks.
 */
export const getTaskList = async () => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  return tasks;
};

/**
 * Retrieves the list of tasks filtered by user ID.
 * @param userId - The ID of the user for whom to retrieve tasks.
 * @returns A promise that resolves to the list of tasks for the specified user.
 */
export const getTaskListByUserId = async (userId: string) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const filteredTask = tasks.filter(
    (task: { userId: string }) => task.userId == userId
  );
  return filteredTask;
};

/**
 * Retrieves a task by its ID.
 * @param id - The ID of the task to retrieve.
 * @returns A promise that resolves to the retrieved task or false if not found.
 */
export const getTaskById = async (id: string, userId: string) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const taskIndex = tasks.findIndex(
    (task: ITask) => task.id === id && task.userId === userId
  );
  if (taskIndex >= 0) {
    return tasks[taskIndex];
  }
  return false;
};

/**
 * Retrieves a list of tasks filtered by status and user ID.
 * @param status - The status of the tasks to retrieve.
 * @param user - The ID of the user for whom to retrieve tasks.
 * @returns A promise that resolves to the list of tasks matching the criteria.
 */
export const getTaskListByStatus = async (status: boolean, user: string) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const filteredTask = tasks.filter(
    (task) => task.completed === status && task.userId === user
  );
  return filteredTask;
};

/**
 * Updates the status of a task by its ID.
 * @param id - The ID of the task to update.
 * @param status - The new status of the task.
 * @returns A promise that resolves to the updated task or false if not found.
 */
export const updateTaskStatus = async (
  id: string,
  data: { completed: boolean; userId: string }
) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const taskIndex = tasks.findIndex(
    (task: ITask) => task.id === id && task.userId === data.userId
  );
  if (taskIndex >= 0) {
    tasks[taskIndex].completed = data.completed;
    await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
    return tasks[taskIndex];
  }
  return false;
};

/**
 * Updates a task by its ID with new data.
 * @param id - The ID of the task to update.
 * @param data - The new data for the task.
 * @returns A promise that resolves to the updated task or false if not found.
 */
export const updateTask = async (id: string, data: ITask) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const taskIndex = tasks.findIndex(
    (task: ITask) => task.id === id && task.userId == data.userId
  );
  if (taskIndex >= 0) {
    tasks[taskIndex].value = data.value;
    tasks[taskIndex].completed = data.completed;
    await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
    return tasks[taskIndex];
  }
  return false;
};

/**
 * Deletes a task by its ID.
 * @param id - The ID of the task to delete.
 * @returns A promise that resolves to the updated task list after deletion.
 */
export const deleteTask = async (id: string, userId: string) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const taskIndex = tasks.findIndex(
    (task: ITask) => task.id === id && task.userId === userId
  );
  if (taskIndex >= 0) {
    tasks.splice(taskIndex, 1);
    await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
  }
  return tasks;
};
