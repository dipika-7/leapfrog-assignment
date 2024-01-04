import BaseModel from "./baseModel";
import { ITask } from "../interface/task";

export default class tasksModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        createdBy: "created_by",
      })
      .from("tasks");
  }
  static async getAllByUser(params: any) {
    const query = this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        createdBy: "created_by",
      })
      .from("tasks")
      .where({ createdBy: params.userId })
      .where(params.completed ? { completed: params.completed } : true)
      .whereRaw("LOWER(value) like ?", [`%${params.search?.toLowerCase()}%`]);

    query.offset(params.offset).limit(params.limit);
    return query;
  }

  static countAll() {
    const query = this.queryBuilder()
      .table("tasks")
      .count({ count: "id" })
      .first();

    return query;
  }

  static async getById(id: number, userId: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        createdBy: "created_by",
      })
      .from("tasks")
      .where({ id, created_by: userId })
      .first();
  }

  static async getByUserId(userId: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        createdBy: "created_by",
      })
      .from("tasks")
      .where({ createdBy: userId })
      .first();
  }

  static async getByStatus(status: boolean, user: string, params: any) {
    const query = this.queryBuilder()
      .select({
        id: "id",
        value: "value",
        completed: "completed",
        createdBy: "created_by",
      })
      .from("tasks")
      .where({ completed: status, createdBy: user });

    query.offset(params.offset).limit(params.limit);
    return query;
  }

  static async create(task: ITask) {
    return this.queryBuilder().insert(task).table("tasks");
  }

  static async update(
    id: number,
    data: ITask | { completed: boolean; created_by: string }
  ) {
    return await this.queryBuilder().update(data).table("tasks").where({ id });
  }

  static async delete(id: number, userId: number) {
    return this.queryBuilder()
      .table("tasks")
      .where({ id, createdBy: userId })
      .del();
  }
}
