const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/user.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

router.get(
  "/",
  (req, res, next) => AuthMiddleware.tokenValidation(req, res, next),
  (req, res) => UserControllers.getAll(req, res)
);
router.post("/create", (req, res) => UserControllers.createUser(req, res));

module.exports = router;
