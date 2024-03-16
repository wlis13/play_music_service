const { Router } = require("express");
const {
  getMusicsController,
  getOneMusicController,
  addMusicController,
  removeMusicsController,
  updateMusicController,
} = require("../controllers/crudForService.controller");

const musicRoutes = Router();

musicRoutes.get("/all_musics", getMusicsController);
musicRoutes.get("/one_music", getOneMusicController);
musicRoutes.post("/add_music", addMusicController);
musicRoutes.put("/update_music", updateMusicController);
musicRoutes.delete("/remove_all", removeMusicsController);

module.exports = musicRoutes;
