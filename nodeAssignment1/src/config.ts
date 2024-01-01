import dotenv from "dotenv";

dotenv.config();

const config = {
  serverPort: process.env.SERVER_PORT || 8000,
  jwt: {
    tokenSecret: process.env.TOKEN_SECRET || "TOKEN_SECRET",
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "3000",
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "5000",
  },
  saltRound: parseInt(process.env.SALT_ROUND || "10", 10),
};

export default config;
