import { MESSAGE, ROLES } from "../constants/index.js";
import ApiError from "../helpers/ApiError.js";
import UserService from "./User.service.js";
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
		await UserService.addCreatedPost(userId, post._id);
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

	async deletePost(postId, user) {
		const foundPost = await PostModel.findById(postId);

		if (!foundPost) return null;

		// user that is trying to remove post is not its author
		if (foundPost.author.toString() !== user.id) {
			// administrators are allowed to remove other user's posts
			if (!user.role.includes(ROLES.ADMIN)) throw ApiError.Forbidden();
		}

		await PostModel.findByIdAndDelete(foundPost._id);
		await UserService.removeCreatedPost(foundPost.author, foundPost._id);
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
