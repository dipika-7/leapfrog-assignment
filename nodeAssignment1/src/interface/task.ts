export interface ITask {
  id: number;
  userId: number;
  value: string;
  completed: boolean;
  created_by: number;
}

export interface ITaskQuery {
  search?: string;
  completed?: string;
}
