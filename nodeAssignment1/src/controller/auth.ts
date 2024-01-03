import { NextFunction, Request, Response } from "express";
import * as fs from "fs";

import * as authService from "../service/auth";

import { GLOBALVARS } from "../constant/statusCode";

/**
 * Handles user signup.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  await authService
    .signup(body)
    .then((signup) => {
      if (!signup) {
        res.json({
          status: GLOBALVARS.emailConflict,
          message: "Email already used",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Signed up successfully",
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Handles user login.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  await authService
    .login(data)
    .then((result) => {
      if (!result.status) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: result.message,
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: result.message,
          data: result.data,
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Generates a new refresh token.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const generateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.body.refresh_token;
  await authService
    .generateRefreshToken(refreshToken)
    .then((result) => {
      if (!result.status) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: result.message,
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: result.message,
          data: {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          },
        });
      }
    })
    .catch((e) => next(e));
};

/**
 * Handles user logout.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  if (data.refreshToken) {
    const resetToken = await authService.logout(data.refreshToken);
  }
  res.json({
    status: GLOBALVARS.successStatusCode,
    message: "Logout Successfully",
  });
};
