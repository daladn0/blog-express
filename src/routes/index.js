import { Router } from "express";
import UserRouter from "./User.router.js";

const router = Router();

router.use("/user", UserRouter);

export default router;
