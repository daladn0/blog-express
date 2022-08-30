import PostModel from "../models/Post.model.js";

class PostService {
	async createPost(title, body, categories, userId) {
		const post = await PostModel.create({
			title,
			body,
			categories,
			author: userId,
		});
		const populatedPost = await post.populate(
			"author categories",
			"fullName email avatar -_id title image"
		);
		return populatedPost;
	}
}

export default new PostService();
