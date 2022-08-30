import { validationResult } from "express-validator";
import { MESSAGE, VALIDATION_MESSAGE } from "../constants/index.js";
import ApiError from "../helpers/ApiError.js";
import PostService from "../services/Post.service.js";

class PostController {
	async createPost(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw ApiError.BadRequest(MESSAGE.INVALID_PARAMETERS, errors.array());
			}

			const { title, body } = req.body;

			const createdPost = await PostService.createPost(
				title,
				body,
				req.body.categories,
				req.user.id
			);

			res.send(createdPost);
		} catch (err) {
			next(err);
		}
	}

	async getAll() {
		try {
		} catch (err) {
			next(err);
		}
	}

	async getOne(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw ApiError.BadRequest(MESSAGE.INVALID_PARAMETERS, errors.array());
			}

			const { id } = req.params;

			const post = await PostService.getOne(id);

			res.send(post);
		} catch (err) {
			next(err);
		}
	}

	async updatePost(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw ApiError.BadRequest(MESSAGE.INVALID_PARAMETERS, errors.array());
			}

			const { id } = req.params;

			const updatedPost = await PostService.updatePost(id, req.body);

			res.send(updatedPost);
		} catch (err) {
			next(err);
		}
	}

	async deletePost(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw ApiError.BadRequest(
					VALIDATION_MESSAGE.INVALID_PARAMETERS,
					errors.array()
				);
			}

			const { id } = req.params;

			await PostService.deletePost(id);

			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}
}

export default new PostController();
