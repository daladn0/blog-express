import jwt from "jsonwebtoken";
import config from "../config.js";
import { VARIABLES } from "../constants/index.js";

/**
 * Generate access/refresh tokens pair
 * @param {Object} payload Payload to encode into tokens
 */
export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: VARIABLES.JWT_ACCESS_EXPIRES,
  });
  const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: VARIABLES.JWT_REFRESH_EXPIRES,
  });

  return {
    accessToken,
    refreshToken,
  };
}
