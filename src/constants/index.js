export const JWT_TYPES = {
	ACCESS: "ACCESS",
	REFRESH: "REFRESH",
};

export const ROLES = {
	USER: "USER",
	ADMIN: "ADMIN",
};

export const VARIABLES = {
	JWT_ACCESS_EXPIRES: "30m",
	JWT_REFRESH_EXPIRES: "30d",

	COOKIE_REFRESH_TOKEN_EXPIRES: 30 * 24 * 60 * 60 * 1000,

	FULLNAME_MIN_LENGTH: 3,
	FULLNAME_MAX_LENGTH: 24,

	PASSWORD_MIN_LENGTH: 6,
	PASSWORD_MAX_LENGTH: 48,

	POST_TITLE_MIN_LENGTH: 10,
	POST_TITLE_MAX_LENGTH: 100,
	POST_BODY_MIN_LENGTH: 10,
	POST_BODY_MAX_LENGTH: 5000,

	CATEGORY_TITLE_MIN_LENGTH: 3,
	CATEGORY_TITLE_MAX_LENGTH: 24,
};

export const VALIDATION_MESSAGE = {
	ID_NOT_PROVIDED: `Id is not provided`,
	ID_INVALID: `Invalid id provided`,

	FULLNAME_LENGTH: `Full name should have from ${VARIABLES.FULLNAME_MIN_LENGTH} up to ${VARIABLES.FULLNAME_MAX_LENGTH} chars`,
	INVALID_EMAIL: `Invalid email`,

	EMAIL_NOT_PROVIDED: `Email is not provided`,

	PASSWORD_LENGTH: `Password should have from ${VARIABLES.PASSWORD_MIN_LENGTH} up to ${VARIABLES.PASSWORD_MAX_LENGTH} chars`,
	PASSWORD_NOT_PROVIDED: `Password is not provided`,

	POST_TITLE_LENGTH: `Post title should have from ${VARIABLES.POST_TITLE_MIN_LENGTH} up to ${VARIABLES.POST_TITLE_MAX_LENGTH} chars`,
	POST_BODY_LENGTH: `Post body should have from ${VARIABLES.POST_BODY_MIN_LENGTH} up to ${VARIABLES.POST_BODY_MAX_LENGTH} chars`,

	CATEGORY_TITLE_LENGTH: `Category title should have from ${VARIABLES.CATEGORY_TITLE_MIN_LENGTH} up to ${VARIABLES.CATEGORY_TITLE_MAX_LENGTH} chars`,
	CATEGORY_NOT_ARRAY: `Categories should be an array of valid id's`,
	CATEGORY_INVALID_MONGO_ID: `Invalid category id provided`,
};

export const MESSAGE = {
	USER_ALREADY_EXISTS: "User with given email already exists",
	USER_DOESNT_EXIST: "User with given email doesn't exist",

	INVALID_CREDENTIALS: "Invalid credentials",
	INVALID_PARAMETERS: "Invalid parameters",

	CATEGORY_ALREADY_EXISTS: "Category with given title already exists",
	CATEGORY_NOT_FOUND: "Category not found",

	POST_NOT_FOUND: `Post not found`,
};
