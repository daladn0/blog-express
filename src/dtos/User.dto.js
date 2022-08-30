export class UserJWTDTO {
  id;
  role;

  /**
   * UserDto
   * @param {Object} model User model
   */
  constructor(model) {
    this.id = model._id;
    this.role = model.role;
  }
}

export class UserModelDTO {
  fullName;
  email;
  avatar;
  isActivated;

  /**
   * User Model representation
   * @param {Object} model User model
   */
  constructor(model) {
    this.fullName = model.fullName;
    this.email = model.email;
    this.avatar = model.avatar;
    this.isActivated = model.isActivated;
  }
}
