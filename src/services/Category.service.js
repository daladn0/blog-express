import { MESSAGE } from "../constants/index.js";
import ApiError from "../helpers/ApiError.js";
import CategoryModel from "../models/Category.model.js";

class CategoryService {
	async getAll() {
		const categories = await CategoryModel.find();
		return categories;
	}

	async createCategory(title) {
		const candidate = await CategoryModel.findOne({ title });

		if (candidate) throw ApiError.BadRequest(MESSAGE.CATEGORY_ALREADY_EXISTS);

		const category = await CategoryModel.create({ title });

		return category;
	}

	async updateCategory(id, title) {
		const foundCategory = await CategoryModel.findById(id);

		if (!foundCategory) throw ApiError.NotFound(MESSAGE.CATEGORY_NOT_FOUND);

		foundCategory.title = title;

		await foundCategory.save();

		return foundCategory;
	}

	async deleteCategory(id) {
		await CategoryModel.findByIdAndRemove(id);
	}
}

export default new CategoryService();
