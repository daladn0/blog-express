import bcrypt from "bcryptjs";
import config from "../config.js";
import { MESSAGE, ROLES } from "../constants/index.js";
import ApiError from "../helpers/ApiError.js";
import UserModel from "../models/User.model.js";
import RoleModel from "../models/Role.model.js";

class UserService {
  async registration(fullName, email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(MESSAGE.USER_ALREADY_EXISTS);
    }

    const userRole = await RoleModel.findOne({ value: ROLES.USER });

    const hashedPassword = bcrypt.hashSync(password, parseInt(config.SALT));

    const createdUser = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      role: userRole.value,
    });

    return {
      fullName: createdUser.fullName,
      email: createdUser.email,
      avatar: createdUser.avatar,
      isActivated: createdUser.isActivated,
    };
  }
}

export default new UserService();
