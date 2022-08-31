import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		avatar: {
			type: String,
			default:
				"https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg",
		},
		role: [{ type: String, ref: "Role" }],
		refreshToken: { type: String },
		createdPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
		savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
		isActivated: { type: Boolean, default: false },
		activationLink: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model("User", schema);
