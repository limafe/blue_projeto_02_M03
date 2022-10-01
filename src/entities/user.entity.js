module.exports = class User {
  constructor(object) {
    this.name = object.name;
    this.username = object.username;
    this.email = object.email;
    this.password = object.password;
    this.photo = object.photo;
  }

  validate() {
    if (!this.name || !this.username || !this.email || !this.password) {
      throw new Error("Missing filelds in user creation.");
    }
  }

  getUser() {
    return {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      photo: this.photo,
    };
  }
};
