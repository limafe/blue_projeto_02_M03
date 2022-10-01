const User = require("../entities/user.entity");
const bcrypt = require("bcryptjs");
const UserServices = require("../services/user.services");

module.exports = class UserControllers {
  static createUser = async (req, res) => {
    const body = req.body;

    if (!body) {
      return res.status(400).send({ message: "Missing fields in request." });
    }

    const newUser = new User(body);

    try {
      newUser.validate();
    } catch (err) {
      return res.status(400).send({ message: "Missing fields in request." });
    }

    const userBody = newUser.getUser();

    const foundUserByEmail = await UserServices.getByEmail(userBody.email);
    const foundUserByUsername = await UserServices.getByUsername(
      userBody.username
    );

    if (foundUserByEmail || foundUserByUsername) {
      return res.status(400).send({ message: "User already registered." });
    }

    userBody.password = bcrypt.hashSync(userBody.password, 10);

    const createdUser = await UserServices.createUser(userBody);

    if (!createdUser) {
      return res
        .status(500)
        .send({ message: "There was an error creating user." });
    }

    return res.status(200).send(createdUser);
  };

  static getAll = async (req, res) => {
    const allUsers = await UserServices.getAll();

    return res.status(200).send(allUsers);
  };
};
