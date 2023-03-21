const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  shortDescription: String,
  description: String,
  imageUrl: String,
  author: { type: String, require: true },
});

module.exports = mongoose.model("Post", postSchema);
