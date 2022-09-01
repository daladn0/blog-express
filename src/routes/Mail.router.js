import { Router } from "express";
import MailController from "../controllers/Mail.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/send-link", AuthMiddleware, MailController.sendLink);

export default router;
