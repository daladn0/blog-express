import { validationResult } from "express-validator";
import { MESSAGE, VALIDATION_MESSAGE } from "../constants/index.js";
import CategoryService from "../services/Category.service.js";
import ApiError from "../helpers/ApiError.js";
import { validateResults } from "../helpers/ValidateRequest.js";

class CategoryController {
	async getAll(req, res, next) {
		try {
			const categories = await CategoryService.getAll();

			res.send(categories);
		} catch (err) {
			next(err);
		}
	}

	async createCategory(req, res, next) {
		try {
			validateResults(req, MESSAGE.INVALID_PARAMETERS, "BadRequest");

			const { title } = req.body;

			const createdCategory = await CategoryService.createCategory(title);

			res.send(createdCategory);
		} catch (err) {
			next(err);
		}
	}

	async updateCategory(req, res, next) {
		try {
			validateResults(req, MESSAGE.INVALID_PARAMETERS, "BadRequest");

			const { id } = req.params;
			const { title } = req.body;

			const updatedCategory = await CategoryService.updateCategory(id, title);

			res.send(updatedCategory);
		} catch (err) {
			next(err);
		}
	}

	async deleteCategory(req, res, next) {
		try {
			validateResults(req, MESSAGE.INVALID_PARAMETERS, "BadRequest");

			const { id } = req.params;

			await CategoryService.deleteCategory(id);

			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	}
}

export default new CategoryController();
