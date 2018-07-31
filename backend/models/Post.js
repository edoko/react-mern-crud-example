var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  title: String,
  writer: String,
  content: String,
  write_date: {
    type: Date,
    default: () => new Date().getTime() + 1000 * 60 * 60 * 9
  }
});

module.exports = mongoose.model("Post", PostSchema);
