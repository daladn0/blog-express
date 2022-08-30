import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Post", schema);
