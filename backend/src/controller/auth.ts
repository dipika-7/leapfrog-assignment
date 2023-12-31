import { Request, Response } from "express";

import * as authService from "../service/auth";

export const signup = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(body);

  const signup = await authService.signup(body);
  return res.json({
    message: "Signed up successfully",
  });
};
