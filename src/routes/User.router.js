import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/User.controller.js";
import { VARIABLES, VALIDATION_MESSAGE } from "../constants/index.js";
const router = Router();

router.post(
	"/registration",
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
router.get("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/activate/:link", UserController.activate);

export default router;
