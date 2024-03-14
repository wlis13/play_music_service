const { Router } = require("express");
const {
  getMusicsController,
  getOneMusicController,
  addMusicController,
  removeMusicsController,
} = require("../controllers/crudForService.controller");

const musicRoutes = Router();

musicRoutes.get("/all_musics", getMusicsController);
musicRoutes.get("/one_music", getOneMusicController);
musicRoutes.post("/add_music", addMusicController);
musicRoutes.delete("/remove_all", removeMusicsController);

module.exports = musicRoutes;
