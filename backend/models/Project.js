const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

  title: String,
  description: String,

  image: String,

  techStack: [String],

  demoLink: String,
  githubLink: String,

  type: String,

  featured: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
