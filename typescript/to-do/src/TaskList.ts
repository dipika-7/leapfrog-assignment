import { Task } from "./Task";

export interface ITaskList {
  list: Task[];

  getTaskById: (id: string) => Task | null;
  getTaskByIndex: (index: number) => Task | null;

  addTask: (task: Task) => Task[];
}

export class TaskList {
  list: Task[];

  constructor(task?: Task[]) {
    this.list = task ? task : [];
  }

  addTask = (task: Task) => {
    this.list.push(task);
    return this.list;
  };

  getTaskById = (id: string) => {
    return this.list.find((item) => item.id === id) || null;
  };

  getTaskByIndex = (index: number) => {
    return this.list[index] || null;
  };
}
