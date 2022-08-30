import jwt from "jsonwebtoken";
import config from "../config.js";
import { VARIABLES, JWT_TYPES } from "../constants/index.js";

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

/**
 * Validate JWT token
 * @param {string} token JWT token
 * @param {string} type JWT type token
 * @returns decoded data from token
 */
export function validateToken(token, type) {
  try {
    if (type === JWT_TYPES.ACCESS) {
      return jwt.verify(token, config.JWT_ACCESS_SECRET);
    }

    if (type === JWT_TYPES.REFRESH) {
      return jwt.verify(token, config.JWT_REFRESH_SECRET);
    }
  } catch {
    return null;
  }
}
