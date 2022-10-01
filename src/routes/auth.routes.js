const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/auth.controllers");

router.post("/login", (req, res) => AuthControllers.login(req, res));

module.exports = router;
