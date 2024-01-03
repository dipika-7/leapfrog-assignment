import * as fs from "fs/promises";

import UserModel from "../model/users";

const filePath = "../constant/user.json";

/**
 * Retrieves all users from the user JSON file.
 * @returns A promise that resolves to an array of users.
 */
export const getUsers = async () => {
  const users = await UserModel.getAll();
  return users;
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
