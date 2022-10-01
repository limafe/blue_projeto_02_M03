const UserServices = require("../services/user.services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class AuthControllers {
  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Missing fields in request." });
    }

    const foundUser = await UserServices.getByEmail(email);

    if (!foundUser) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordValidation = bcrypt.compareSync(password, foundUser.password);

    if (passwordValidation === false) {
      return res.status(400).send({ message: "Invalid password." });
    }

    if (passwordValidation === true) {
      const token = jwt.sign({ email: email }, process.env.SECRET, {
        expiresIn: 86400,
      });

      return res.status(200).send({ token: token });
    }
  };
};
