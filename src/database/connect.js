const mongoose = require("mongoose");

module.exports = class MongoConnection {
  static connect() {
    mongoose
      .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to Database"))
      .catch((err) => console.log("Error: " + err));
  }
};
