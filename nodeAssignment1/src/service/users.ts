import * as fs from "fs/promises";
import { GetAllUsersQuery } from "../interface/user";
import UserModel from "../model/users";
import { buildMeta, getPaginationOptions } from "../util/pagination";

/**
 * Retrieves all users from the user JSON file.
 * @returns A promise that resolves to an array of users.
 */
export const getUsers = async (query: GetAllUsersQuery) => {
  const { page, size } = query;
  const pageDetails = getPaginationOptions({ page, size });

  const usersPromise = await UserModel.getAll({ ...pageDetails, ...query });
  const countPromise = UserModel.countAll();
  const [users, count] = await Promise.all([usersPromise, countPromise]);

  const total = count.count;
  const meta = buildMeta(total, size, page);

  return {
    data: users,
    meta,
  };
};

/**
 * Retrieves a user by their email from the user JSON file.
 * @param email - The email of the user to retrieve.
 * @returns A promise that resolves to the user with the specified email.
 */
export const getUserByEmail = async (email: string) => {
  const user = await UserModel.getByEmail(email);
  return user;
};
