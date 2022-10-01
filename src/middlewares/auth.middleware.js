const jwt = require("jsonwebtoken");
const UserServices = require("../services/user.services");

module.exports = class AuthMiddleware {
  static tokenValidation = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(498).send({ message: "Invalid Token" });
    }

    const split = authorization.split(" ");

    if (split[0] !== "Bearer" || split[0] === undefined) {
      return res.status(400).send({ message: "Invalid Token" });
    }

    jwt.verify(split[1], process.env.SECRET, async (err, decoded) => {
      if (err) {
        return res.status(400).send({ message: "Invalid Token" });
      }

      const foundUser = await UserServices.getByEmail(decoded.email);

      if (!foundUser) {
        return res.status(400).send({ message: "Invalid Token" });
      }

      return next();
    });
  };
};
