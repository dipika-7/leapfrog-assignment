import * as fs from "fs/promises";

import { ILogin, ISignup } from "../interface/auth";

const filePath = "src/constant/user.json";

export const createUser = async (data: ISignup) => {
  console.log("here");
  const users: ISignup[] = JSON.parse(await fs.readFile(filePath, "utf-8"));
  console.log(users);
  users.push(data);
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  return users;
};

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

export const getUserList = async () => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  if (existingUsers.length >= 0) {
    return existingUsers;
  } else {
    return false;
  }
};

export const updateUser = async (id: string, data: Object) => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const userIndex = existingUsers.findIndex(
    (user: { id: string }) => user.id === id
  );
  if (userIndex >= 0) {
    existingUsers[userIndex] = data;
    await fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2));
    return existingUsers[userIndex];
  }
  return false;
};
