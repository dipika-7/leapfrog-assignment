import { NextFunction, Request, Response } from "express";

import { GLOBALVARS } from "../constant/statusCode";
import * as User from "../model/users";
import { verifyToken } from "../helper/jwt";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["authorization"]) {
    const payload: any = await verifyToken(
      req.headers["authorization"].split(" ")[1]
    );
    if (!payload || payload.tokenType == "refreshToken") {
      return res.json({
        status: GLOBALVARS.errorStatusCode,
        message: "Invalid token",
      });
    } else {
      const user = await User.getUserById(payload.id);
      next();
    }
  } else {
    return res.json({
      status: GLOBALVARS.errorStatusCode,
      message: "Authorization headers require",
    });
  }
};
