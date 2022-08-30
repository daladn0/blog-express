import { Router } from "express";
import { body } from "express-validator";
import { VALIDATION_MESSAGE, VARIABLES } from "../constants/index.js";
import PostController from "../controllers/Post.controller.js";
import ApiError from "../helpers/ApiError.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);
router.post(
	"/",
	AuthMiddleware,
	body("title", VALIDATION_MESSAGE.POST_TITLE_LENGTH).exists().trim().isLength({
		min: VARIABLES.POST_TITLE_MIN_LENGTH,
		max: VARIABLES.POST_TITLE_MAX_LENGTH,
	}),
	body("body", VALIDATION_MESSAGE.POST_BODY_LENGTH).custom((value) => {
		// post might have no body, so if body parameter is missing then it's a valid post
		// but if body parameter is passed then it has to be validated
		if (!value) return true;

		if (
			value.length < VARIABLES.POST_BODY_MIN_LENGTH ||
			value.length > VARIABLES.POST_BODY_MAX_LENGTH
		)
			return false;

		return true;
	}),
	body("categories").custom((value) => {
		if (!value) return true;

		if (!Array.isArray(value)) {
			throw ApiError.BadRequest(VALIDATION_MESSAGE.CATEGORY_NOT_ARRAY);
		}

		value.forEach((category) => {
			const mongoIdRegexp = /^[a-fA-F0-9]{24}$/;

			if (!category.toString().match(mongoIdRegexp)) {
				throw ApiError.BadRequest(
					VALIDATION_MESSAGE.CATEGORY_INVALID_MONGO_ID + ": " + category
				);
			}
		});

		return true;
	}),
	PostController.createPost
);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export default router;
