const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  title: String,
  category: String,
  price: String,
  description: String,

  demoLink: String,

  image: String,

  techStack: [String]

}, { timestamps: true });

module.exports = mongoose.model("StudentProject", schema);
