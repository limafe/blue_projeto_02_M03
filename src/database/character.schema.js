const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = CharacterModel = mongoose.model("Character", CharacterSchema);
