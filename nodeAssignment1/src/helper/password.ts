import bcrypt from "bcrypt";
import config from "../config";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, config.saltRound);
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  return await bcrypt.compare(password, hashPassword);
};
