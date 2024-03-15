const mongoose = require("mongoose");

const schemaMusic = new mongoose.Schema({
  title: String,
  image: String,
  music: String,
  category: String,
  description: String,
  like: { type: Boolean, default: false }
});

const Music = mongoose.model("Music", schemaMusic);

module.exports = Music;
