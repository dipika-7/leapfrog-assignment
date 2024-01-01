import { NextFunction, Request, Response } from "express";

import { GLOBALVARS } from "../constant/statusCode";
import * as User from "../model/users";
import { verifyToken } from "../helper/jwt";

import "../util/custom";

/**
 * Authentication middleware to verify JWT token and populate req.user with user information.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for passing control to the next middleware/route.
 */
export const Auth = async (req: any, res: Response, next: NextFunction) => {
  if (req.headers["authorization"]) {
    // Extract and verify the token
    const payload: any = await verifyToken(
      req.headers["authorization"].split(" ")[1]
    );

    // Check if the token is invalid or a refreshToken
    if (!payload || payload.tokenType == "refreshToken") {
      return res.json({
        status: GLOBALVARS.errorStatusCode,
        message: "Invalid token",
      });
    } else {
      // Retrieve user information from the database
      const user = await User.getUserById(payload.userId);

      // Assign user information to req.user
      req.user = user;
      next();
    }
  } else {
    // If "Authorization" header is not present, return an error response
    return res.json({
      status: GLOBALVARS.errorStatusCode,
      message: "Authorization headers require",
    });
  }
};
