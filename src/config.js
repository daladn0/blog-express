import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI,
  PORT: parseInt(process.env.PORT),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  SALT: process.env.SALT,
  CLIENT_URL: process.env.CLIENT_URL,
};
