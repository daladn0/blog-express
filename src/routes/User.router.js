import { Router } from "express";
import { body, param } from "express-validator";
import UserController from "../controllers/User.controller.js";
import { VARIABLES, VALIDATION_MESSAGE } from "../constants/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.post(
	"/registration",
	// FIXME: fullName validation error is duplicated in server response
	body("fullName", VALIDATION_MESSAGE.FULLNAME_LENGTH)
		.exists()
		.trim()
		.isLength({
			min: VARIABLES.FULLNAME_MIN_LENGTH,
			max: VARIABLES.FULLNAME_MAX_LENGTH,
		}),
	body("email", VALIDATION_MESSAGE.INVALID_EMAIL).isEmail().normalizeEmail(),
	body("password", VALIDATION_MESSAGE.PASSWORD_LENGTH).trim().isLength({
		min: VARIABLES.PASSWORD_MIN_LENGTH,
		max: VARIABLES.PASSWORD_MAX_LENGTH,
	}),
	UserController.registration
);
router.post(
	"/login",
	body("email", VALIDATION_MESSAGE.EMAIL_NOT_PROVIDED).exists({
		checkFalsy: true,
	}),
	body("password", VALIDATION_MESSAGE.PASSWORD_NOT_PROVIDED).exists({
		checkFalsy: true,
	}),
	UserController.login
);
router.post(
	"/save-post/:id",
	authMiddleware,
	param("id")
		.exists()
		.withMessage(VALIDATION_MESSAGE.ID_NOT_PROVIDED)
		.isMongoId()
		.withMessage(VALIDATION_MESSAGE.ID_INVALID),
	UserController.savePost
);
router.post(
	"/unsave-post/:id",
	authMiddleware,
	param("id")
		.exists()
		.withMessage(VALIDATION_MESSAGE.ID_NOT_PROVIDED)
		.isMongoId()
		.withMessage(VALIDATION_MESSAGE.ID_INVALID),
	UserController.unsavePost
);
router.get("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/activate/:link", UserController.activate);

export default router;
