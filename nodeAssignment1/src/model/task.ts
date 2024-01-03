import BaseModel from "./baseModel";
import { ITask } from "../interface/task";

export default class tasksModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        userId: "userId",
      })
      .from("tasks");
  }

  static async getById(id: number, userId: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        userId: "userId",
      })
      .from("tasks")
      .where({ id })
      .first();
  }

  static async getByUserId(userId: number) {
    console.log(userId);
    return this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        userId: "user_id",
      })
      .from("tasks")
      .where({ userId })
      .first();
  }

  static async getByStatus(status: boolean, user: string) {
    return await this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        userId: "userId",
      })
      .from("tasks")
      .where({ completed: status, userId: user });
  }

  static async create(task: ITask) {
    return this.queryBuilder().insert(task).table("tasks");
  }

  static async update(
    id: number,
    data: ITask | { completed: boolean; userId: string }
  ) {
    return await this.queryBuilder().update(data).table("tasks").where({ id });
  }

  static async delete(id: number, userId: number) {
    return this.queryBuilder().table("tasks").where({ id, userId }).del();
  }
}
