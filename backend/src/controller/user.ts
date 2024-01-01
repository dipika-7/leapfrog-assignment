import { Request, Response } from "express";

import * as userService from "../service/users";

export const getUsers = (req: Request, res: Response) => {
  // const data = userService.getUsers();
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

export const getUserByName = (req: Request, res: Response) => {
  // http://localhost:8000/users?na=hah
  const params = req.query;
  return res.json({
    message: params,
    // message: `Listed User By ${params}`,
  });
};
