const { Router } = require("express");
const {
  // getAllMusicsController,
  imageUploadController,
  musicUploadController,
} = require("../controllers/firebase.controller");
const multer = require("multer")

const Multer = multer({
  storage: multer.memoryStorage()
});

const urlsRouter = Router();

// urlsRouter.get("/", getAllMusicsController);
urlsRouter.post("/add_image_firebase", Multer.single("file"), imageUploadController)
urlsRouter.post("/add_music_firebase", Multer.single("file"), musicUploadController)

module.exports = urlsRouter;
