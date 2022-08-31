import ApiError from "./ApiError.js";
import { validationResult } from "express-validator";
import { VALIDATION_MESSAGE, VARIABLES } from "../constants/index.js";

/**
 * Request validation error
 * @param {Object} req http request object
 * @param {string} message error message
 * @param {string} method ApiError instance method. E.g: BadRequest
 */
export function validateResults(req, message, method) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw ApiError[method](message, errors.array());
	}
}

/**
 * Validate Categories
 * @param {*} value field to validate
 * @returns True if valid and false otherwise
 */
export function validateCategories(value) {
	if (!value) return true;

	if (!Array.isArray(value)) {
		throw ApiError.BadRequest(VALIDATION_MESSAGE.CATEGORY_NOT_ARRAY);
	}

	value.forEach((category) => {
		const mongoIdRegexp = /^[a-fA-F0-9]{24}$/;

		if (!category.toString().match(mongoIdRegexp)) {
			throw ApiError.BadRequest(
				VALIDATION_MESSAGE.CATEGORY_INVALID_MONGO_ID + ": " + category
			);
		}
	});

	return true;
}

/**
 * Validate Body
 * @param {*} value field to validate
 * @returns True if valid and false otherwise
 */
export function validateBody(value) {
	if (!value) return true;

	if (
		value.length < VARIABLES.POST_BODY_MIN_LENGTH ||
		value.length > VARIABLES.POST_BODY_MAX_LENGTH
	)
		return false;

	return true;
}

/**
 * Validate Title
 * @param {*} value field to validate
 * @returns true if valid and false otherwise
 */
export function validateTitle(value) {
	if (!value) return true;

	if (
		value.length < VARIABLES.POST_TITLE_MIN_LENGTH ||
		value.length > VARIABLES.POST_TITLE_MAX_LENGTH
	)
		return false;

	return true;
}
