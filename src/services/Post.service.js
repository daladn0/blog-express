import { MESSAGE, VALIDATION_MESSAGE } from "../constants/index.js";
import ApiError from "../helpers/ApiError.js";
import PostModel from "../models/Post.model.js";

class PostService {
	async createPost(title, body, categories, userId) {
		let postCategories = [];

		// remove duplicates from categories
		if (categories) {
			postCategories = [...new Set(categories)];
		}

		const post = await PostModel.create({
			title,
			body,
			categories: postCategories,
			author: userId,
		});
		const populatedPost = await post.populate(
			"author categories",
			"fullName email avatar title image"
		);
		return populatedPost;
	}

	async updatePost(id, { title, body, categories }) {
		const foundPost = await PostModel.findById(id);

		if (!foundPost) throw ApiError.NotFound(MESSAGE.POST_NOT_FOUND);

		if (title) foundPost.title = title;

		if (body) foundPost.body = body;

		// remove duplicates from categories
		if (categories) foundPost.categories = [...new Set(categories)];

		await foundPost.save();

		const populatedPost = await foundPost.populate(
			"author categories",
			"fullName email avatar title image"
		);

		return populatedPost;
	}

	async deletePost(id) {
		await PostModel.findByIdAndDelete(id);
	}

	async getOne(id) {
		const foundPost = await PostModel.findById(id);

		if (!foundPost) throw ApiError.NotFound(MESSAGE.POST_NOT_FOUND);

		const populatedPost = await foundPost.populate(
			"author categories",
			"email avatar fullName title image"
		);

		return populatedPost;
	}

	async getAll(limit, page, sortOrder, categories) {
		const offset = (page - 1) * limit;

		let posts;
		let totalCount;

		if (categories && categories.length) {
			posts = await PostModel.find({ categories: { $in: categories } })
				.sort({ createdAt: sortOrder })
				.skip(offset)
				.limit(limit)
				.populate("author categories", "fullName email avatar title image");

			totalCount = await PostModel.countDocuments({
				categories: { $in: categories },
			});
		} else {
			posts = await PostModel.find({})
				.sort({ createdAt: sortOrder })
				.skip(offset)
				.limit(limit)
				.populate("author categories", "fullName email avatar title image");

			totalCount = await PostModel.countDocuments();
		}

		return {
			items: posts,
			totalCount,
		};
	}
}

export default new PostService();
