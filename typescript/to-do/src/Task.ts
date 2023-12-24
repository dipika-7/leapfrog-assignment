import { ID_LENGTH } from "./constants";
import { getRandomString } from "./util";

export interface ITask {
  id: string;
  value: string;
  completed: boolean;

  setValue: (value: string) => void;
  getValue: () => string;

  setCompleted: (completed: boolean) => void;
  getCompleted: () => boolean;
  toogleCompleted: () => void;
}

export class Task implements ITask {
  id: string;
  value: string;
  completed: boolean;

  constructor(value = "", completed = false) {
    this.id = getRandomString(ID_LENGTH);
    this.value = value;
    this.completed = completed;
  }

  setValue = (value: string) => {
    this.value = value;
  };

  getValue = () => {
    return this.value;
  };

  setCompleted = (completed: boolean) => {
    this.completed = completed;
  };

  getCompleted = () => {
    return this.completed;
  };

  toogleCompleted = () => {
    this.completed = !this.completed;
  };
}
