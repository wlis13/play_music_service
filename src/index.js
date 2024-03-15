const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlsRouter = require("./routes/firebase.routes");
const musicRoutes = require("./routes/crudRoutes.routes");
require("dotenv").config()

const whiteList = 'http://localhost:5173';

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  }
}

const port = process.env.PORT;
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb' }));
app.use(express.json());

app.use("/", urlsRouter);
app.use("/", musicRoutes);

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@clusterplaymusic.idjau3r.mongodb.net/`)
  .then(() => {
    console.log("Connection db successful!")
    app.listen(port, () => console.log(`Servidor escutando na porta: ${port}`))
  })

module.exports = app;
