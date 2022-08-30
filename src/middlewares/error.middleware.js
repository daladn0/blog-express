import ApiError from "../helpers/ApiError.js";

export default function (err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    // if app in a production mode then don't show user exact server error message
    if (err.status === 500 && process.env.NODE_ENV === "production") {
      res.status(500).send({ message: "Internal server error" });
    }

    return res
      .status(err.status)
      .send({ message: err.message, errors: err.errors });
  }

  res.status(500).send({ message: "Internal server error" });
}
