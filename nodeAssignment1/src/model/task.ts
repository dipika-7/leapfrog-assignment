import fs from "fs/promises";
import { ITask } from "../interface/task";
import { getRandomString } from "../util/utils";
import { ID_LENGTH } from "../constant/constants";

const taskFilePath = "src/constant/task.json";

export const createTask = async (data: ITask) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  data.id = getRandomString(ID_LENGTH);
  tasks.push(data);

  await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
  return tasks;
};

export const getTaskList = async () => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  return tasks;
};

export const getTaskById = async (id: string) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const taskIndex = tasks.findIndex((task: ITask) => task.id === id);
  if (taskIndex >= 0) {
    return tasks[taskIndex];
  }
  return false;
};

export const getTaskListByStatus = async (status: boolean) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const filteredTask = tasks.filter((task) => task.completed == status);
  return filteredTask;
};

export const updateTaskStatus = async (id: string, status: boolean) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const taskIndex = tasks.findIndex((task: ITask) => task.id === id);
  if (taskIndex >= 0) {
    tasks[taskIndex].completed = status;
    await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
    return tasks[taskIndex];
  }
  return false;
};

export const updateTask = async (id: string, data: ITask) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const taskIndex = tasks.findIndex((task: ITask) => task.id === id);
  if (taskIndex >= 0) {
    tasks[taskIndex].value = data.value;
    tasks[taskIndex].completed = data.completed;
    await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
    return tasks[taskIndex];
  }
  return false;
};

export const deleteTask = async (id: string) => {
  const tasks: ITask[] = JSON.parse(await fs.readFile(taskFilePath, "utf-8"));
  const taskIndex = tasks.findIndex((task: ITask) => task.id === id);
  if (taskIndex >= 0) {
    tasks.splice(taskIndex, 1);
    await fs.writeFile(taskFilePath, JSON.stringify(tasks, null, 2));
  }
  return tasks;
};
