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
}

export default new UserController();
