import ApiError from "../helpers/ApiError.js";

export default function (err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .send({ message: err.message, errors: err.errors });
  }

  res.status(500).send({ message: "Internal server error" });
}
