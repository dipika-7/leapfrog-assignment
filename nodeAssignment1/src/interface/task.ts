import { PaginationQuery } from "./pagination";
export interface ITask {
  id: number;
  value: string;
  completed: boolean;
  createdBy: number;
}

export interface ITaskQuery {
  search?: string;
  completed?: string;
}

export interface GetAllTasksQuery extends PaginationQuery {
  search?: string;
  completed?: boolean;
}
