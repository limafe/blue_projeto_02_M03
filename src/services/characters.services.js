const CharacterModel = require("../database/character.schema");

module.exports = class CharacterServices {
  static createCharacter = async (characterBody) => {
    return await CharacterModel.create(characterBody);
  };

  static getAllCharacters = async (limit, offset) => {
    return await CharacterModel.find().skip(offset).limit(limit);
  };

  static getCharacterById = async (charId) => {
    return await CharacterModel.findOne({ _id: charId });
  };

  static updateCharacter = async (charId, charBody) => {
    return await CharacterModel.findOneAndUpdate({ _id: charId }, charBody, {
      new: true,
    });
  };

  static deleteCharacter = async (charId) => {
    return await CharacterModel.findOneAndDelete({ _id: charId });
  };

  static getCharacterByName = async (charName) => {
    return await CharacterModel.findOne({ name: charName });
  };
};
