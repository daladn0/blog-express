import MailService from "../services/Mail.service.js";
import UserService from "../services/User.service.js";
import ApiError from "../helpers/ApiError.js";
import { MESSAGE, VALIDATION_MESSAGE } from "../constants/index.js";

class MailController {
	async sendLink(req, res, next) {
		try {
			const userId = req?.user?.id;

			if (!userId)
				throw ApiError.BadRequest(VALIDATION_MESSAGE.ID_NOT_PROVIDED);

			const user = await UserService.getUserById(userId);

			await MailService.sendActivationMail(user.email, user.activationLink);

			res.send({ message: MESSAGE.EMAIL_ACTIVATION_SENT });
		} catch (err) {
			next(err);
		}
	}
}

export default new MailController();
