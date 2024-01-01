import { NextFunction, Request, Response } from "express";
import * as fs from "fs";

import * as authService from "../service/auth";

import { GLOBALVARS } from "../constant/statusCode";

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

export const generateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.body.refreshToken;
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
