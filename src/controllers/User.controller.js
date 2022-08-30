import { validationResult } from "express-validator";
import UserService from "../services/User.service.js";
import ApiError from "../helpers/ApiError.js";

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Invalid credentials", errors.array());
      }

      const { fullName, email, password } = req.body;

      const createdUser = await UserService.registration(
        fullName,
        email,
        password,
      );

      res.send(createdUser);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();