import { validationResult } from "express-validator";
import { MESSAGE } from "../constants/index.js";
import CategoryService from "../services/Category.service.js";
import ApiError from "../helpers/ApiError.js";

class CategoryController {
	async getCategories(req, res, next) {
		try {
		} catch (err) {
			next(err);
		}
	}

	async createCategory(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw ApiError.BadRequest(MESSAGE.INVALID_PARAMETERS, errors.array());
			}

			const { title } = req.body;

			const createdCategory = await CategoryService.createCategory(title);

			res.send(createdCategory);
		} catch (err) {
			next(err);
		}
	}

	async updateCategory(req, res, next) {
		try {
		} catch (err) {
			next(err);
		}
	}

	async deleteCategory(req, res, next) {
		try {
		} catch (err) {
			next(err);
		}
	}
}

export default new CategoryController();
