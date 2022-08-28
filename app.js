const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
var mongoose = require("mongoose");
const multer = require("multer");
const uploader = multer({ dest: "uploads/" });
const ImgModel = require("./model/imageModel");
const cors = require("cors");

require("dotenv").config();
console.log(process.env.PORT);

if (!process.env.MONGOURL) {
  throw new Error("MONGO-DB URL NOT FOUND");
}
var connection = mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

const alphonicApi = require("./routes/alphonic");

app.use("/interview", alphonicApi);

// image upload miideleware part
// image upload miideleware part
// image upload miideleware part
// image upload miideleware part
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

// image upload miideleware part
// image upload miideleware part
// image upload miideleware part

app.post("/api/image", uploader.single("image"), function (req, res, next) {
  const saveImage = new ImgModel({
    name: req.body.name,
    img: {
      data: fs.readFileSync(path.join("uploads/" + req.file.filename)),
      // data: fs.readFileSync("uploads", req.file.fileName),
      contentType: "image/jpg",
    },
  });
  saveImage
    .save()
    .then((response) => {
      let file = req.file;
      if (!file) return res.status(500).json({ msg: "error is there" });
      else
        return res.status(200).json({ msg: " upload successful", file: file });
      console.log(file);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("started dummy server on port " + process.env.PORT);
});
