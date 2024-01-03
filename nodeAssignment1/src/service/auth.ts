import config from "../config";
import { ISignup, ILogin } from "../interface/auth";
import { comparePassword, hashPassword } from "../helper/password";
import { generateToken, verifyToken } from "../helper/jwt";
import UserModel from "../model/users";

/**
 * Signs up a new user by checking if the email is unique, hashing the password, and adding the user to the file.
 * @param body - The user details for signup.
 * @returns A promise that resolves to true if signup is successful, false otherwise.
 */
export const signup = async (body: ISignup) => {
  const userDetail = await UserModel.getByEmail(body.email);
  if (userDetail) {
    return false;
  }
  body.password = await hashPassword(body.password);
  const addNewUser = await UserModel.create(body);
  if (addNewUser) {
    return true;
  } else {
    return false;
  }
};

/**
 * Logs in a user by verifying the email and password, generating access and refresh tokens, and updating the user's tokens.
 * @param data - The login credentials.
 * @returns A promise that resolves to an object with login status, message, and user data if successful.
 */
export const login = async (data: ILogin) => {
  const userDetail = await UserModel.getByEmail(data.email);
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

  userDetail.refresh_token = refreshToken;

  const updateUserDetail = await UserModel.update(userDetail.id, userDetail);
  delete userDetail.password;
  userDetail.access_token = accessToken;
  return {
    status: true,
    message: "Login Successfully",
    data: userDetail,
  };
};

/**
 * Generates a new access and refresh token pair using a valid refresh token.
 * @param token - The refresh token to use for generating new tokens.
 * @returns A promise that resolves to an object with new access and refresh tokens and a status message.
 */
export const generateRefreshToken = async (token: string) => {
  const payload: any = await verifyToken(token);
  const userDetail = await UserModel.getById(payload.id);
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

  payload.tokenType = "access_token";
  const accessToken = await generateToken(
    payload,
    config.jwt.accessTokenExpiresIn
  );

  payload.tokenType = "refresh_token";
  const refreshToken = await generateToken(
    payload,
    config.jwt.refreshTokenExpiresIn
  );

  delete userDetail.refreshToken;
  userDetail.refresh_token = refreshToken;

  const updateUserDetail = await UserModel.update(payload.id, userDetail);
  userDetail.access_token = accessToken;

  return {
    status: true,
    accessToken: accessToken,
    refreshToken: refreshToken,
    message: "Token Refreshed",
  };
};

/**
 * Logs out a user by clearing the access and refresh tokens.
 * @param refreshToken - The refresh token to identify the user.
 * @returns A promise that resolves to the updated user or false if the user is not found.
 */
export const logout = async (refreshToken: string) => {
  const user = await UserModel.getByRefreshToken(refreshToken);
  if (!user) {
    return user;
  } else {
    user.accessToken = "";
    user.refreshToken = "";
    const updateUser = await UserModel.update(user.id, user);
    return updateUser;
  }
};
