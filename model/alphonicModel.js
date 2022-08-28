const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var alphonicSchema = new Schema(
  {
    name: String,
    email: String,
    image: { type: Schema.Types.ObjectId, ref: "Image" },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("alphonic", alphonicSchema);
