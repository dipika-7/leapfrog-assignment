import jwt from "jsonwebtoken";

import config from "../config";

/**
 * Generates a JWT token with the provided data and expiration time.
 * @param data - The data to be included in the token.
 * @param expiresIn - The expiration time for the token.
 * @returns A JWT token.
 */
export const generateToken = async (data: Object, expiresIn: string) => {
  return jwt.sign(data, config.jwt.tokenSecret!, {
    expiresIn,
  });
};

/**
 * Verifies a JWT token and returns its decoded payload.
 * @param token - The JWT token to be verified.
 * @returns The decoded payload if the token is valid, otherwise false.
 */
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
