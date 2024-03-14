const mongoose = require("mongoose");

const schemaMusic = new mongoose.Schema({
  title: String,
  image: String,
  music: mongoose.Schema.Types.Mixed,
  musicUrl: String,
  category: String,
  description: String
});

const Music = mongoose.model("Music", schemaMusic);

module.exports = Music;
