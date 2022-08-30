import { Router } from "express";

import UserRouter from "./User.router.js";
import PostRouter from "./Post.router.js";
import CategoryRouter from "./Category.router.js";

const router = Router();

router.use("/user", UserRouter);
router.use("/post", PostRouter);
router.use("/category", CategoryRouter);

export default router;
