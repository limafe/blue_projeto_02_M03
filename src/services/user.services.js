const UserModel = require("../database/user.schema");

module.exports = class UserServices {
  static createUser = async (userBody) => {
    const newUser = await UserModel.create(userBody);
    return newUser;
  };

  static getAll = async () => {
    return await UserModel.find();
  };

  static getByEmail = async (userEmail) => {
    console.log(userEmail);
    const foundUser = await UserModel.findOne({ email: userEmail }).select(
      "+password"
    );
    console.log(foundUser);
    return foundUser;
  };

  static getByUsername = async (userUsername) => {
    const foundUser = await UserModel.findOne({
      username: userUsername,
    }).select("+password");
    return foundUser;
  };
};
