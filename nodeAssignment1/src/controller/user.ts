import { Request, Response } from "express";

import * as userService from "../service/users";

export const getUsers = (req: Request, res: Response) => {
  const data = userService.getUsers();
  return res.json({
    message: "Hello",
  });
};

export const getUserById = (req: Request, res: Response) => {
  const id = +req.params.id;
  return res.json({
    message: `Listed User By ${id}`,
  });
};

export const getUserByEmail = (req: Request, res: Response) => {
  const params = req.query;
  return res.json({
    message: params,
    // message: `Listed User By ${params}`,
  });
};
