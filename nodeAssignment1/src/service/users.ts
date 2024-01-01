// import * as userModel from "../model/users";
import * as fs from "fs/promises";

import { ISignup } from "../interface/auth";

const filePath = "../constant/user.json";

export const getUsers = async () => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  return existingUsers;
};

export const getUserByEmail = async (email: string) => {
  const existingUsers = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const userIndex = existingUsers.findIndex(
    (user: ISignup) => user.email === email
  );
  return existingUsers[userIndex];
};
