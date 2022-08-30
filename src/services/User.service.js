import bcrypt from "bcryptjs";
import config from "../config.js";
import { MESSAGE, ROLES } from "../constants/index.js";
import ApiError from "../helpers/ApiError.js";
import UserModel from "../models/User.model.js";
import RoleModel from "../models/Role.model.js";
import { generateTokens } from "../helpers/JWT.js";
import { UserJWTDTO, UserModelDTO } from "../dtos/User.dto.js";

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

    const userModelDto = new UserModelDTO(createdUser);

    return userModelDto;
  }

  async login(email, password) {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) throw ApiError.BadRequest(MESSAGE.INVALID_CREDENTIALS);

    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (!isPasswordCorrect)
      throw ApiError.BadRequest(MESSAGE.INVALID_CREDENTIALS);

    const userJwtDto = new UserJWTDTO(foundUser);

    const tokens = generateTokens({ ...userJwtDto });

    foundUser.refreshToken = tokens.refreshToken;

    await foundUser.save();

    const userModelDto = new UserModelDTO(foundUser);

    return {
      user: userModelDto,
      tokens,
    };
  }
}

export default new UserService();
