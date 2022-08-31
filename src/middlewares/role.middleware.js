import ApiError from "../helpers/ApiError.js";

export default function (roles) {
	return function (req, res, next) {
		try {
			if (req.method === "OPTIONS") {
				next();
			}

			const { role: userRoles } = req?.user;

			if (!userRoles || !Array.isArray(userRoles)) throw ApiError.Forbidden();

			let hasRole = false;

			roles.forEach((role) => {
				userRoles.forEach((userRole) => {
					if (role === userRole) hasRole = true;
				});
			});

			if (!hasRole) throw ApiError.Forbidden();

			next();
		} catch (err) {
			next(err);
		}
	};
}
