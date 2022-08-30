import mongoose from "mongoose";

const schema = new mongoose.Schema({
  value: { type: String },
});

export default mongoose.model("Role", schema);
