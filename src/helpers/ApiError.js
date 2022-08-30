export default class ApiError extends Error {
	message;
	errors;
	status;

	/**
	 * ApiError Constructor
	 * @param {string} message - Error message
	 * @param {number} status - Http status code
	 * @param {Array} errors - Array of errors
	 */
	constructor(message, status, errors = []) {
		super(message);
		this.message = message;
		this.status = status;
		this.errors = errors;
	}

	/**
	 * 400 Bad Request
	 * @param {string} message - Error message
	 * @param {Array} errors - Errors array
	 * @returns ApiError instance with 400 bad request error
	 */
	static BadRequest(message, errors) {
		return new ApiError(message, 400, errors);
	}

	/**
	 * 401 Unauthorized
	 * @returns ApiError instance with 401 Unauthorized error
	 */
	static Unauthorized() {
		return new ApiError("Unauthorized", 401);
	}

	/**
	 * 403 Forbidden
	 * @returns ApiError instance with 403 Forbidden error
	 */
	static Forbidden() {
		return new ApiError("Forbidden", 403);
	}

	/**
	 * 500 Internal Server error
	 * @param {string} message - Error message
	 * @returns ApiError instance with 500 internal server error
	 */
	static Internal(message) {
		return new ApiError(message, 500);
	}

	/**
	 * 404 Not found error
	 * @param {string} message - Error message
	 * @returns ApiError instance with 404 not found error
	 */
	static NotFound(message) {
		return new ApiError(message, 404);
	}
}
