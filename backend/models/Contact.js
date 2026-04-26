const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

  name: String,
  email: String,
  phone: String,
  projectType: String,
  budget: String,
  message: String,

  status: {
    type: String,
    default: "New"
  }

}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
