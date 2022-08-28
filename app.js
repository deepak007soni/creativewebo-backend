const express = require("express");
const app = express();
var mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const imgModel = require("./model/imageModel");
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
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});



var uploadStorage = multer({ storage: storage });

// image upload miideleware part
// image upload miideleware part
// image upload miideleware part

app.post("/api/image", upload.single("image"), function (req, res, next) {
  let file = req.file;
  console.log(file);
  if (!file) return res.status(500).json({ msg: "error is there" });
  else return res.status(200).json({ msg: " upload successful" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("started dummy server on port " + process.env.PORT);
});
