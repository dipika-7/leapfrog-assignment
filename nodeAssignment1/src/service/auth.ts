import * as fs from "fs/promises";

import config from "../config";
import { ISignup, ILogin } from "../interface/auth";
import { comparePassword, hashPassword } from "../helper/password";
import { generateToken, verifyToken } from "../helper/jwt";
import * as User from "../model/users";

const filePath = "src/constant/user.json";

export const signup = async (body: ISignup) => {
  const userDetail = await User.getUserByEmail(body.email);
  if (userDetail) {
    return false;
  }
  body.password = await hashPassword(body.password);
  const addNewUser = await User.createUser(body);
  if (addNewUser) {
    return true;
  } else {
    return false;
  }
};

export const login = async (data: ILogin) => {
  const userDetail = await User.getUserByEmail(data.email);
  if (!userDetail) {
    return {
      status: false,
      message: "User Not Found",
    };
  }

  const passwordMatch = await comparePassword(
    data.password,
    userDetail.password
  );
  if (!passwordMatch) {
    return {
      status: false,
      message: "Login Failed",
    };
  }

  const user = {
    id: userDetail.id,
    email: data.email,
    tokenType: "accessToken",
  };

  const accessToken = await generateToken(
    user,
    config.jwt.accessTokenExpiresIn
  );

  user.tokenType = "refreshToken";
  const refreshToken = await generateToken(
    user,
    config.jwt.refreshTokenExpiresIn
  );

  userDetail.accessToken = accessToken;
  userDetail.refreshToken = refreshToken;

  const updateUserDetail = await User.updateUser(userDetail.id, userDetail);
  delete userDetail.password;

  return {
    status: true,
    message: "Login Successfully",
    data: userDetail,
  };
};

export const generateRefreshToken = async (token: string) => {
  const payload: any = await verifyToken(token);
  const userDetail = await User.getUserById(payload.id);

  if (!payload || payload.tokenType !== "refreshToken") {
    return {
      status: false,
      message: "Invalid token",
    };
  }

  if (userDetail.refreshToken !== token) {
    return {
      status: false,
      message: "Invalid token",
    };
  }

  delete payload.iat;
  delete payload.exp;
  delete payload.tokenType;

  payload.tokenType = "accessToken";
  const accessToken = await generateToken(
    payload,
    config.jwt.accessTokenExpiresIn
  );

  payload.tokenType = "refreshToken";
  const refreshToken = await generateToken(
    payload,
    config.jwt.refreshTokenExpiresIn
  );

  userDetail.accessToken = accessToken;
  userDetail.refreshToken = refreshToken;

  const updateUserDetail = await User.updateUser(payload.id, userDetail);

  return {
    status: true,
    accessToken: accessToken,
    refreshToken: refreshToken,
    message: "Token Refreshed",
  };
};
