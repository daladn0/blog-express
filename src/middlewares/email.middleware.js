import ApiError from "../helpers/ApiError.js";
import { MESSAGE } from "../constants/index.js";

export default function (req, res, next) {
	try {
		const isActivated = req?.user?.isActivated;

		if (!isActivated) throw ApiError.Forbidden(MESSAGE.EMAIL_NOT_ACTIVATED);

		next();
	} catch (err) {
		next(err);
	}
}
