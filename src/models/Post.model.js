import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		title: { type: String },
		body: { type: String },
		image: { type: String },
		categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

export default mongoose.model("Post", schema);
