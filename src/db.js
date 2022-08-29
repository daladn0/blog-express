import mongoose from "mongoose";
import config from "./config.js";

async function connect() {
  await mongoose.connect(config.MONGO_URI);
}

export default {
  connect,
  mongoose,
};
