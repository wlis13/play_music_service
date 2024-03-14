const { Router } = require("express");
const {
  imageUploadController,
  musicUploadController,
} = require("../controllers/firebase.controller");
const multer = require("multer")

const Multer = multer({
  storage: multer.memoryStorage()
});

const urlsRouter = Router();

urlsRouter.post("/add_image_firebase", Multer.single("file"), imageUploadController)
urlsRouter.post("/add_music_firebase", Multer.single("file"), musicUploadController)

module.exports = urlsRouter;
