const express = require("express");
const router = express.Router();
const CharactersControllers = require("../controllers/characters.controllers");
const AuthMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  (req, res, next) => AuthMiddleware.tokenValidation(req, res, next),
  (req, res) => CharactersControllers.createCharacter(req, res)
);

router.get(
  "/",
  (req, res, next) => AuthMiddleware.tokenValidation(req, res, next),
  (req, res) => CharactersControllers.getAllCharacters(req, res)
);

router.get(
  "/find/:id",
  (req, res, next) => AuthMiddleware.tokenValidation(req, res, next),
  (req, res) => CharactersControllers.getCharacterById(req, res)
);

router.put(
  "/update/:id",
  (req, res, next) => AuthMiddleware.tokenValidation(req, res, next),
  (req, res) => CharactersControllers.updateCharacter(req, res)
);

router.delete(
  "/delete/:id",
  (req, res, next) => AuthMiddleware.tokenValidation(req, res, next),
  (req, res) => CharactersControllers.deleteCharacter(req, res)
);

router.get(
  "/search",
  (req, res, next) => AuthMiddleware.tokenValidation(req, res, next),
  (req, res) => CharactersControllers.getCharacterByName(req, res)
);

module.exports = router;
