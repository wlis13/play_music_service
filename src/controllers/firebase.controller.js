let admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
};

const bucket = process.env.STORAGE_BUCKET;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucket
});

const BUCKET = admin.storage().bucket();

async function imageUploadController(req, res, next) {
  try {
    if (!req.file) return next();
    const image = req.file;
    const file = BUCKET.file("images/" + image.originalname);

    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype
      }
    });

    stream.on("finish", async () => {
      await file.makePublic();
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2100'
      });

      res.status(202).json({ url: url })
    });
    stream.end(image.buffer)

  } catch (error) {
    res.status(500).json({ message: `Erro ao adicionar a imagem: ${error}` })
  }
}

async function musicUploadController(req, res, next) {
  try {
    if (!req.file) return next();
    const music = req.file;
    const file = BUCKET.file("all_musics/" + music.originalname);

    const stream = file.createWriteStream({
      metadata: {
        contentType: music.mimetype
      }
    });

    stream.on("finish", async () => {
      await file.makePublic();
      req.file.firebaseUrl = `https://storage.googleapis.com/${bucket}/${music.originalname}`;

      res.status(202).json({ url: req.file.firebaseUrl })
    });
    stream.end(music.buffer)

  } catch (error) {
    res.status(500).json({ message: `Erro ao adicionar a imagem: ${error}` })
  }
}

module.exports = {
  imageUploadController,
  musicUploadController
};
