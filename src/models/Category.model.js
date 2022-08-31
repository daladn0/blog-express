import mongoose from "mongoose";

const schema = mongoose.Schema({
	title: { type: String },
	image: { type: String },
});

export default mongoose.model("Category", schema);
