const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
  name: String,
  genre: String,
  authorId: String,
  createdYear: Number,
  description: String,
});

module.exports = mongoose.model("books", Book);
