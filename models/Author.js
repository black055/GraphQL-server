const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Author = new Schema({
  name: String,
  age: Number,
  gender: String,
  national: String,
});

module.exports = mongoose.model("authors", Author);
