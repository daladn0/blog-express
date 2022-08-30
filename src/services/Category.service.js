import { MESSAGE } from "../constants/index.js";
import ApiError from "../helpers/ApiError.js";
import CategoryModel from "../models/Category.model.js";

class CategoryService {
	async createCategory(title) {
		const candidate = await CategoryModel.findOne({ title });

		if (candidate) throw ApiError.BadRequest(MESSAGE.CATEGORY_ALREADY_EXISTS);

		const category = await CategoryModel.create({ title });

		return category;
	}
}

export default new CategoryService();
