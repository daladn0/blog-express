import { VALIDATION_MESSAGE } from "../constants/index.js";
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
			"fullName email avatar -_id title image"
		);
		return populatedPost;
	}

	async updatePost(id, { title, body, categories }) {
		const foundPost = await PostModel.findById(id);

		if (!foundPost) throw ApiError.NotFound(VALIDATION_MESSAGE.POST_NOT_FOUND);

		if (title) foundPost.title = title;

		if (body) foundPost.body = body;

		// remove duplicates from categories
		if (categories) foundPost.categories = [...new Set(categories)];

		await foundPost.save();

		const populatedPost = await foundPost.populate(
			"author categories",
			"fullname email avatar title image -_id"
		);

		return populatedPost;
	}
}

export default new PostService();
