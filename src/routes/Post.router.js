import { Router } from "express";
import { body, param } from "express-validator";
import { VALIDATION_MESSAGE, VARIABLES, ROLES } from "../constants/index.js";
import {
	validateCategories,
	validateBody,
	validateTitle,
} from "../helpers/ValidateRequest.js";
import PostController from "../controllers/Post.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RoleMiddleware from "../middlewares/role.middleware.js";
const router = Router();

router.get(
	"/",
	body("categories").custom((value) => validateCategories(value)),
	PostController.getAll
);
router.get(
	"/:id",
	param("id")
		.exists()
		.withMessage(VALIDATION_MESSAGE.ID_NOT_PROVIDED)
		.isMongoId()
		.withMessage(VALIDATION_MESSAGE.ID_INVALID),
	PostController.getOne
);
router.post(
	"/",
	AuthMiddleware,
	body("title", VALIDATION_MESSAGE.POST_TITLE_LENGTH).exists().trim().isLength({
		min: VARIABLES.POST_TITLE_MIN_LENGTH,
		max: VARIABLES.POST_TITLE_MAX_LENGTH,
	}),
	body("body", VALIDATION_MESSAGE.POST_BODY_LENGTH).custom((value) =>
		validateBody(value)
	),
	body("categories").custom((value) => validateCategories(value)),
	PostController.createPost
);
router.put(
	"/:id",
	AuthMiddleware,
	RoleMiddleware([ROLES.USER, ROLES.ADMIN]),
	param("id")
		.exists()
		.withMessage(VALIDATION_MESSAGE.ID_NOT_PROVIDED)
		.isMongoId()
		.withMessage(VALIDATION_MESSAGE.ID_INVALID),
	body("title", VALIDATION_MESSAGE.POST_TITLE_LENGTH).custom((value) =>
		validateTitle(value)
	),
	body("body", VALIDATION_MESSAGE.POST_BODY_LENGTH).custom((value) =>
		validateBody(value)
	),
	body("categories").custom((value) => validateCategories(value)),
	PostController.updatePost
);
router.delete(
	"/:id",
	AuthMiddleware,
	RoleMiddleware([ROLES.USER, ROLES.ADMIN]),
	param("id")
		.exists()
		.withMessage(VALIDATION_MESSAGE.ID_NOT_PROVIDED)
		.isMongoId()
		.withMessage(VALIDATION_MESSAGE.ID_INVALID),
	PostController.deletePost
);

export default router;
