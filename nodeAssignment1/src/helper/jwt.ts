import jwt from "jsonwebtoken";

import config from "../config";

export const generateToken = async (data: Object, expiresIn: string) => {
  return jwt.sign(data, config.jwt.tokenSecret!, {
    expiresIn,
  });
};

export const verifyToken = async (token: string) => {
  const tokenStatus = jwt.verify(
    token,
    config.jwt.tokenSecret!,
    (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    }
  );
  return tokenStatus;
};
