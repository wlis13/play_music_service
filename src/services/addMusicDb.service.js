const Music = require("../models/addMusicDb.model")

async function GetAllMusicService() {
  const musics = await Music.find();
  return musics;
};

async function getOneMusicService(id) {
  const music = await Music.findById(id);
  return music;
};

async function updateMusicService(id, updateValue) {
  await Music.updateOne({ _id: id }, updateValue);
  return `Musica ${updateValue.title}, atualizada com sucesso!`
}

async function addMusicService(newMusic) {
  await Music.insertOne(newMusic);
  return `Musica ${newMusic.title} foi adicionada com sucesso!`
}

async function removeAllService() {
  await Music.deleteMany();
  return "Tudo foi deletado."
}

module.exports = {
  GetAllMusicService,
  getOneMusicService,
  updateMusicService,
  removeAllService,
  addMusicService,
}