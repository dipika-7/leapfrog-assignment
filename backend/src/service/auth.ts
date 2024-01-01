import bcrypt from "bcrypt";
// import { jwt } from "jsonwebtoken";

// import { config } from "../config";
import { ISignup } from "../interface/auth";

const SALT_ROUNDS = 10;

export const signup = async (body: ISignup) => {
  await bcrypt.hash(body.password, SALT_ROUNDS, function (err, hash) {
    console.log({ hash });
  });
};
