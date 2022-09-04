export class UserJWTDTO {
	id;
	role;
	isActivated;

	/**
	 * UserDto
	 * @param {Object} model User model
	 */
	constructor(model) {
		this.id = model._id;
		this.role = model.role;
		this.isActivated = model.isActivated;
	}
}

export class UserModelDTO {
	fullName;
	email;
	avatar;
	isActivated;
	id;
	roles;

	/**
	 * User Model representation
	 * @param {Object} model User model
	 */
	constructor(model) {
		this.id = model._id;
		this.fullName = model.fullName;
		this.email = model.email;
		this.avatar = model.avatar;
		this.isActivated = model.isActivated;
		this.roles = model.role;
	}
}
