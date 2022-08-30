import { Router } from "express";
import { body } from "express-validator";
import { VALIDATION_MESSAGE, VARIABLES } from "../constants/index.js";
import CategoryController from "../controllers/Category.controller.js";
const router = Router();

router.get("/", CategoryController.getCategories);
router.post(
	"/",
	body("title", VALIDATION_MESSAGE.CATEGORY_TITLE_LENGTH)
		.exists()
		.trim()
		.isLength({
			min: VARIABLES.CATEGORY_TITLE_MIN_LENGTH,
			max: VARIABLES.CATEGORY_TITLE_MAX_LENGTH,
		}),
	CategoryController.createCategory
);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
