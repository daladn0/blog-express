import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(morgan(":method :url :status :response-time ms"));
app.use(cors({ credentials: true, origin: config.CLIENT_URL }));
app.use(cookieParser());

app.use("/api/v1", router);

app.use(ErrorMiddleware);

export default app;
