import ApiError from "../helpers/ApiError.js";
import { JWT_TYPES } from "../constants/index.js";
import { validateToken } from "../helpers/JWT.js";

export default function (req, res, next) {
	try {
		const authorization = req.headers.authorization;

		if (!authorization) throw ApiError.Unauthorized();

		const token = authorization.split(" ")[1];

		if (!token) throw ApiError.Unauthorized();

		const decodedData = validateToken(token, JWT_TYPES.ACCESS);

		if (!decodedData) throw ApiError.Unauthorized();

		req.user = decodedData;
		next();
	} catch (err) {
		next(err);
	}
}
