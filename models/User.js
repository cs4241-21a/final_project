const mongoose = require("mongoose");
const { Schema } = mongoose;

// Timestamp is floored to the minute
const User = new Schema({
  un: String,
  pw: String,
  em: String,
  favs: [],
});

module.exports = {
  model: mongoose.model("User", User),
  schema: User,
};
