import config from "../config";
import { ISignup, ILogin } from "../interface/auth";
import { comparePassword, hashPassword } from "../helper/password";
import { generateToken, verifyToken } from "../helper/jwt";
import * as User from "../model/users";

/**
 * Signs up a new user by checking if the email is unique, hashing the password, and adding the user to the file.
 * @param body - The user details for signup.
 * @returns A promise that resolves to true if signup is successful, false otherwise.
 */
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

/**
 * Logs in a user by verifying the email and password, generating access and refresh tokens, and updating the user's tokens.
 * @param data - The login credentials.
 * @returns A promise that resolves to an object with login status, message, and user data if successful.
 */
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
    id: userDetail.userId,
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

  const updateUserDetail = await User.updateUser(userDetail.userId, userDetail);
  delete userDetail.password;

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

/**
 * Logs out a user by clearing the access and refresh tokens.
 * @param refreshToken - The refresh token to identify the user.
 * @returns A promise that resolves to the updated user or false if the user is not found.
 */
export const logout = async (refreshToken: string) => {
  const user = await User.getUserByRefreshToken(refreshToken);
  if (!user) {
    return user;
  } else {
    user.accessToken = "";
    user.refreshToken = "";
    const updateUser = await User.updateUser(user.id, user);
    return updateUser;
  }
};
