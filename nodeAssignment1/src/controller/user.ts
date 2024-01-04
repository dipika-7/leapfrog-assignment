import { NextFunction, Request, Response } from "express";

import * as userService from "../service/users";
import { GLOBALVARS } from "../constant/statusCode";
import { GetAllUsersQuery } from "../interface/user";

export const getUsers = async (req: any, res: Response, next: NextFunction) => {
  const query = req.query;
  await userService
    .getUsers(query as unknown as GetAllUsersQuery)
    .then((result) => {
      if (!result) {
        res.json({
          status: GLOBALVARS.errorStatusCode,
          message: "Fail to list",
        });
      } else {
        res.json({
          status: GLOBALVARS.successStatusCode,
          message: "Successfully listed",
          data: result,
        });
      }
    })
    .catch((e) => next(e));
};
