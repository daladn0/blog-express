import dotenv from "dotenv";
import app from "./app.js";
import db from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

async function startApp() {
  try {
    await db.connect();

    app.listen(PORT, () => {
      console.log(`Server is up and running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

startApp();
