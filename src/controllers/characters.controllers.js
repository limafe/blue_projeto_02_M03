const Character = require("../entities/character.entity");
const CharacterServices = require("../services/characters.services");

module.exports = class CharactersControllers {
  static createCharacter = async (req, res) => {
    const newCharacter = new Character(req.body);

    try {
      newCharacter.validate();
    } catch (err) {
      return res.status(400).send({ message: "Missing fields in request." });
    }

    const createdCharacter = await CharacterServices.createCharacter(
      newCharacter.getCharacter()
    );

    if (!createdCharacter) {
      return res
        .status(500)
        .send({ message: "There was an error creating character." });
    }

    return res.status(200).send(createdCharacter);
  };

  static getAllCharacters = async (req, res) => {
    const { limit, offset } = req.query;

    const allCharacters = await CharacterServices.getAllCharacters(
      limit,
      offset
    );

    if (!allCharacters) {
      return res.status(404).send({ message: "Chracters not found." });
    }

    return res.status(200).send(allCharacters);
  };

  static getCharacterById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ message: "Missing id in request." });
    }

    const foundCharacter = await CharacterServices.getCharacterById(id);

    if (!foundCharacter) {
      return res.status(404).send({ message: "Chracter not found." });
    }

    return res.status(200).send(foundCharacter);
  };

  static updateCharacter = async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ message: "Missing id in request." });
    }

    const foundCharacter = await CharacterServices.getCharacterById(id);

    if (!foundCharacter) {
      return res.status(404).send({ message: "Chracter not found." });
    }

    const characterToUpdate = {
      user: req.body.user ? req.body.user : foundCharacter.user,
      name: req.body.name ? req.body.name : foundCharacter.name,
      imageUrl: req.body.imageUrl ? req.body.imageUrl : foundCharacter.imageUrl,
    };

    const updatedCharacter = await CharacterServices.updateCharacter(
      id,
      characterToUpdate
    );

    if (!updatedCharacter) {
      res
        .status(500)
        .send({ message: "There was an error updating character." });
    }

    return res.status(200).send(updatedCharacter);
  };

  static deleteCharacter = async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ message: "Missing id in request." });
    }

    const deletedCharacter = await CharacterServices.deleteCharacter(id);

    if (!deletedCharacter) {
      return res.status(404).send({ message: "Chracter not found." });
    }

    return res.status(200).send(deletedCharacter);
  };

  static getCharacterByName = async (req, res) => {
    const name = req.query.name;

    if (!name) {
      return res.status(400).send({ message: "Missing name in request." });
    }

    const foundCharacter = await CharacterServices.getCharacterByName(name);

    if (!foundCharacter) {
      return res.status(404).send({ message: "Chracter not found." });
    }

    return res.status(200).send(foundCharacter);
  };
};
