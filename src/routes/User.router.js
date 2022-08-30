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
      min: VARIABLES.FULLNAME_MIN_WIDTH,
      max: VARIABLES.FULLNAME_MAX_WIDTH,
    }),
  body("email", VALIDATION_MESSAGE.INVALID_EMAIL).isEmail().normalizeEmail(),
  body("password", VALIDATION_MESSAGE.PASSWORD_LENGTH).trim().isLength({
    min: VARIABLES.PASSWORD_MIN_WIDTH,
    max: VARIABLES.PASSWORD_MAX_WIDTH,
  }),
  UserController.registration,
);
router.post("/login", UserController.login);
router.get("/refresh", UserController.refresh);
router.get("/logout", UserController.logout);

export default router;
