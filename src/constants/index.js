export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const VARIABLES = {
  FULLNAME_MIN_WIDTH: 3,
  FULLNAME_MAX_WIDTH: 24,
  PASSWORD_MIN_WIDTH: 6,
  PASSWORD_MAX_WIDTH: 48,
};

export const VALIDATION_MESSAGE = {
  FULLNAME_LENGTH: `Full name should have from ${VARIABLES.FULLNAME_MIN_WIDTH} up to ${VARIABLES.FULLNAME_MAX_WIDTH} chars`,
  INVALID_EMAIL: `Invalid email`,
  PASSWORD_LENGTH: `Password should have from ${VARIABLES.PASSWORD_MIN_WIDTH} up to ${VARIABLES.PASSWORD_MAX_WIDTH} chars`,
};

export const MESSAGE = {
  USER_ALREADY_EXISTS: "User with given email already exists",
};
