module.exports = class Character {
  constructor(object) {
    this.user = object.user;
    this.name = object.name;
    this.imageUrl = object.imageUrl;
  }

  validate() {
    if (!this.user || !this.name || !this.imageUrl) {
      throw new Error("Invalid fields in character creation.");
    }
  }

  getCharacter() {
    return {
      user: this.user,
      name: this.name,
      imageUrl: this.imageUrl,
    };
  }
}
