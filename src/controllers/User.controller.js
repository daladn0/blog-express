import { validationResult } from "express-validator";
import UserService from "../services/User.service.js";
import ApiError from "../helpers/ApiError.js";
import { VARIABLES } from "../constants/index.js";

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw ApiError.BadRequest("Invalid credentials", errors.array());
			}

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
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw ApiError.BadRequest("Invalid credentials", errors.array());
			}

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
		const activationLink = req.params.link;

		await UserService.activate(activationLink);

		// FIXME: replace with redirection to the client when it's up
		res.redirect("https://google.com");
	}
}

export default new UserController();
