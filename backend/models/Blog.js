const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

  title: String,
  slug: String,

  content: String,

  coverImage: String,

  category: String

}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
