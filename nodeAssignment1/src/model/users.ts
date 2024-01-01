import * as fs from "fs/promises";

import { ILogin, ISignup, IUser } from "../interface/auth";
import { getRandomString } from "../util/utils";
import { ID_LENGTH } from "../constant/constants";

const filePath = "src/constant/user.json";

/**
 * Creates a new user and adds it to the user list.
 * @param data - The user data to be created.
 * @returns A promise that resolves to the created user.
 */
export const createUser = async (data: ISignup) => {
  const users: ISignup[] = JSON.parse(await fs.readFile(filePath, "utf-8"));
  data.userId = getRandomString(ID_LENGTH);
  users.push(data);
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  return data;
};

/**
 * Retrieves a user by their email.
 * @param email - The email of the user to retrieve.
 * @returns A promise that resolves to the retrieved user or false if not found.
 */
export const getUserByEmail = async (email: string) => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const userIndex = existingUsers.findIndex(
    (user: ILogin) => user.email === email
  );
  if (userIndex >= 0) {
    return existingUsers[userIndex];
  } else {
    return false;
  }
};

/**
 * Retrieves a user by their refresh token.
 * @param refreshToken - The refresh token of the user to retrieve.
 * @returns A promise that resolves to the retrieved user or false if not found.
 */
export const getUserByRefreshToken = async (refreshToken: string) => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const userIndex = existingUsers.findIndex(
    (user: IUser) => user.refreshToken === refreshToken
  );
  if (userIndex >= 0) {
    return existingUsers[userIndex];
  } else {
    return false;
  }
};

/**
 * Retrieves a user by their ID.
 * @param id - The ID of the user to retrieve.
 * @returns A promise that resolves to the retrieved user or false if not found.
 */
export const getUserById = async (id: string) => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const userIndex = existingUsers.findIndex(
    (user: { id: string }) => user.id === id
  );
  if (userIndex >= 0) {
    return existingUsers[userIndex];
  } else {
    return false;
  }
};

/**
 * Retrieves the list of all users.
 * @returns A promise that resolves to the list of users.
 */
export const getUserList = async () => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  if (existingUsers.length >= 0) {
    return existingUsers;
  } else {
    return false;
  }
};

/**
 * Updates a user by their ID with new data.
 * @param id - The ID of the user to update.
 * @param data - The new data for the user.
 * @returns A promise that resolves to the updated user or false if not found.
 */
export const updateUser = async (id: string, data: Object) => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const userIndex = existingUsers.findIndex(
    (user: IUser) => user.userId === id
  );
  if (userIndex >= 0) {
    existingUsers[userIndex] = data;
    await fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2));
    return existingUsers[userIndex];
  }
  return false;
};
