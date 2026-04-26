const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  clientName: String,
  review: String,
  rating: Number,
  company: String,

  image: String

}, { timestamps: true });

module.exports = mongoose.model("Testimonial", schema);
