export interface ITask {
  id: string;
  userId: string;
  value: string;
  completed: boolean;
}

export interface ITaskQuery {
  search?: string;
  completed?: string;
}
