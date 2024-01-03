import BaseModel from "./baseModel";
import { ILogin, ISignup, IUser } from "../interface/auth";

export default class UserModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
      })
      .from("users");
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        refreshToken: "refresh_token",
      })
      .from("users")
      .where({ id })
      .first();
  }

  static async getByEmail(email: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        password: "password",
        email: "email",
      })
      .from("users")
      .where({ email });

    return user?.[0];
  }

  static async create(user: ISignup) {
    return this.queryBuilder().insert(user).table("users");
  }

  static async update(id: number, user: IUser) {
    return await this.queryBuilder().update(user).table("users").where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table("users").where({ id }).del();
  }

  static async getByRefreshToken(refreshToken: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
      })
      .from("users")
      .where({ refreshToken });

    return user?.[0];
  }
}
