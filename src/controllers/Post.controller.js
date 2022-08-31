import { MESSAGE } from "../constants/index.js";
import PostService from "../services/Post.service.js";
import { API_ERRORS_METHODS } from "../helpers/ApiError.js";
import { validateResults } from "../helpers/ValidateRequest.js";

class PostController {
	async getOne(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const { id } = req.params;

			const post = await PostService.getOne(id);

			res.send(post);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			let { limit, page, sortOrder } = req.query;

			const { categories } = req.body;

			limit = limit || 10;
			page = page || 1;
			sortOrder = parseInt(sortOrder) === 1 ? 1 : -1;

			const posts = await PostService.getAll(
				limit,
				page,
				sortOrder,
				categories
			);
			res.send(posts);
		} catch (err) {
			next(err);
		}
	}

	async createPost(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

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

	async updatePost(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const { id } = req.params;

			const updatedPost = await PostService.updatePost(id, req.body);

			res.send(updatedPost);
		} catch (err) {
			next(err);
		}
	}

	async deletePost(req, res, next) {
		try {
			validateResults(
				req,
				MESSAGE.INVALID_PARAMETERS,
				API_ERRORS_METHODS.BadRequest
			);

			const { id } = req.params;

			await PostService.deletePost(id, req.user.id);

			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}
}

export default new PostController();
