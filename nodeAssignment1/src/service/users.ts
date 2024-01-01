import * as fs from "fs/promises";

import { ISignup } from "../interface/auth";

const filePath = "../constant/user.json";

/**
 * Retrieves all users from the user JSON file.
 * @returns A promise that resolves to an array of users.
 */
export const getUsers = async () => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  return existingUsers;
};

/**
 * Retrieves a user by their email from the user JSON file.
 * @param email - The email of the user to retrieve.
 * @returns A promise that resolves to the user with the specified email.
 */
export const getUserByEmail = async (email: string) => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const userIndex = existingUsers.findIndex(
    (user: ISignup) => user.email === email
  );
  return existingUsers[userIndex];
};
