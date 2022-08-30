export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const VARIABLES = {
  JWT_ACCESS_EXPIRES: "30m",
  JWT_REFRESH_EXPIRES: "30d",
  COOKIE_REFRESH_TOKEN_EXPIRES: 30 * 24 * 60 * 60 * 1000,
  FULLNAME_MIN_WIDTH: 3,
  FULLNAME_MAX_WIDTH: 24,
  PASSWORD_MIN_WIDTH: 6,
  PASSWORD_MAX_WIDTH: 48,
};

export const VALIDATION_MESSAGE = {
  FULLNAME_LENGTH: `Full name should have from ${VARIABLES.FULLNAME_MIN_WIDTH} up to ${VARIABLES.FULLNAME_MAX_WIDTH} chars`,
  INVALID_EMAIL: `Invalid email`,
  EMAIL_NOT_PROVIDED: `Email is not provided`,
  PASSWORD_LENGTH: `Password should have from ${VARIABLES.PASSWORD_MIN_WIDTH} up to ${VARIABLES.PASSWORD_MAX_WIDTH} chars`,
  PASSWORD_NOT_PROVIDED: `Password is not provided`,
};

export const MESSAGE = {
  USER_ALREADY_EXISTS: "User with given email already exists",
  USER_DOESNT_EXIST: "User with given email doesn't exist",
  INVALID_CREDENTIALS: "Invalid credentials",
};
