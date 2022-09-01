import UserService from "../services/User.service.js";
import { MESSAGE, VARIABLES } from "../constants/index.js";
import { API_ERRORS_METHODS } from "../helpers/ApiError.js";
import { validateResults } from "../helpers/ValidateRequest.js";

class UserController {
	async registration(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const { fullName, email, password } = req.body;

			const createdUser = await UserService.registration(
				fullName,
				email,
				password
			);

			res.send(createdUser);
		} catch (err) {
			next(err);
		}
	}

	async login(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const { email, password } = req.body;

			const userData = await UserService.login(email, password);

			res.cookie("refreshToken", userData.tokens.refreshToken, {
				httpOnly: true,
				maxAge: VARIABLES.COOKIE_REFRESH_TOKEN_EXPIRES,
			});

			res.send(userData);
		} catch (err) {
			next(err);
		}
	}

	async refresh(req, res, next) {
		try {
			const refreshToken = req.cookies.refreshToken;

			const userData = await UserService.refresh(refreshToken);

			res.cookie("refreshToken", userData.tokens.refreshToken, {
				httpOnly: true,
				maxAge: VARIABLES.COOKIE_REFRESH_TOKEN_EXPIRES,
			});

			res.send(userData);
		} catch (err) {
			next(err);
		}
	}

	async logout(req, res, next) {
		try {
			const refreshToken = req.cookies.refreshToken;

			await UserService.logout(refreshToken);

			res.clearCookie("refreshToken");

			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;

			await UserService.activate(activationLink);

			// FIXME: replace with redirection to the client when it's up
			res.redirect("https://google.com");
		} catch (err) {
			next(err);
		}
	}

	async savePost(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const { id: postId } = req.params;

			await UserService.savePost(postId, req.user.id);

			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}

	async unsavePost(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const { id: postId } = req.params;

			await UserService.unsavePost(postId, req.user.id);

			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * Get user's post by type
	 * @param {string} type posts type e.g: savedPosts | createdPosts
	 * @param {Object} req http request object
	 * @returns user's posts
	 */
	async getUserPosts(type, req) {
		let { limit, page, sortOrder } = req.query;

		limit = parseInt(limit) || 10;
		page = parseInt(page) || 1;
		sortOrder = parseInt(sortOrder) === 1 ? 1 : -1;

		const posts = await UserService.getUserPosts(
			type,
			req.user.id,
			limit,
			page,
			sortOrder
		);

		return posts;
	}

	async getSavedPosts(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const savedPosts = await new UserController().getUserPosts(
				"savedPosts",
				req
			);

			res.send(savedPosts);
		} catch (err) {
			next(err);
		}
	}

	async getCreatedPosts(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const createdPosts = await new UserController().getUserPosts(
				"createdPosts",
				req
			);

			res.send(createdPosts);
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
