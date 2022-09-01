import { Router } from "express";
import { body, param } from "express-validator";
import { VALIDATION_MESSAGE, VARIABLES, ROLES } from "../constants/index.js";
import CategoryController from "../controllers/Category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import emailMiddleware from "../middlewares/email.middleware.js";
const router = Router();

router.get("/", CategoryController.getAll);
router.post(
	"/",
	body("title", VALIDATION_MESSAGE.CATEGORY_TITLE_LENGTH)
		.exists()
		.trim()
		.isLength({
			min: VARIABLES.CATEGORY_TITLE_MIN_LENGTH,
			max: VARIABLES.CATEGORY_TITLE_MAX_LENGTH,
		}),
	authMiddleware,
	emailMiddleware,
	roleMiddleware([ROLES.ADMIN]),
	CategoryController.createCategory
);
router.put(
	"/:id",
	param("id")
		.exists()
		.withMessage(VALIDATION_MESSAGE.ID_NOT_PROVIDED)
		.isMongoId()
		.withMessage(VALIDATION_MESSAGE.ID_INVALID),
	body("title", VALIDATION_MESSAGE.CATEGORY_TITLE_LENGTH)
		.exists()
		.trim()
		.isLength({
			min: VARIABLES.CATEGORY_TITLE_MIN_LENGTH,
			max: VARIABLES.CATEGORY_TITLE_MAX_LENGTH,
		}),
	authMiddleware,
	emailMiddleware,
	roleMiddleware([ROLES.ADMIN]),
	CategoryController.updateCategory
);
router.delete(
	"/:id",
	param("id")
		.exists()
		.withMessage(VALIDATION_MESSAGE.ID_NOT_PROVIDED)
		.isMongoId()
		.withMessage(VALIDATION_MESSAGE.ID_INVALID),
	authMiddleware,
	emailMiddleware,
	roleMiddleware([ROLES.ADMIN]),
	CategoryController.deleteCategory
);

export default router;
