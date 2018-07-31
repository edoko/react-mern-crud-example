var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  title: String,
  writer: String,
  content: String,
  write_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
