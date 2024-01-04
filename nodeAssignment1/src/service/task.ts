import { ITask, ITaskQuery, GetAllTasksQuery } from "../interface/task";
import TaskModel from "../model/task";
import NotFoundError from "../error/notFoundError";
import { buildMeta, getPaginationOptions } from "../util/pagination";

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
export const getTaskListByUserId = async (
  query: GetAllTasksQuery,
  userId: number
) => {
  const { page, size } = query;

  const pageDetails = getPaginationOptions({ page, size });

  const tasksPromise = TaskModel.getAllByUser({
    ...pageDetails,
    ...query,
    userId,
  });
  const countPromise = TaskModel.countAll();

  const [tasks, count] = await Promise.all([tasksPromise, countPromise]);

  const total = count.count;
  const meta = buildMeta(total, size, page);

  return {
    data: tasks,
    meta,
  };
};

/**
 * Retrieves a list of tasks based on their completion status and user association.
 * @param status - The completion status of the tasks (true or false).
 * @param user - The unique identifier of the user.
 * @returns A promise that resolves to an array of tasks with the specified completion status and user association.
 */
export const getTaskListByStatus = async (
  status: boolean,
  user: string,
  query: GetAllTasksQuery
) => {
  const { page, size } = query;
  const pageDetails = getPaginationOptions({ page, size });

  const tasksPromise = TaskModel.getByStatus(status, user, {
    ...pageDetails,
    ...query,
  });
  const countPromise = TaskModel.countAll();

  const [tasks, count] = await Promise.all([tasksPromise, countPromise]);

  if (!tasks || tasks.length <= 0) {
    throw new NotFoundError(`Task Not Found`);
  }
  const total = count.count;
  const meta = buildMeta(total, size, page);

  return {
    data: tasks,
    meta,
  };
};

/**
 * Updates the completion status of a task .
 * @param id - The unique identifier of the task.
 * @param status - The new completion status of the task.
 * @returns A promise that resolves to the updated task.
 */
export const updateTaskStatus = async (
  id: number,
  data: { completed: boolean; created_by: string }
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
