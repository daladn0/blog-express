import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(morgan(":method :url :status :response-time ms"));
app.use(cors());

app.use("/api/v1", router);

app.use(ErrorMiddleware);

export default app;
