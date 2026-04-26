const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  studentName: String,
  email: String,
  phone: String,
  college: String,
  deadline: String,

  projectId: String,

  budget: String,
  message: String,

  status: {
    type: String,
    default: "New"
  }

}, { timestamps: true });

module.exports = mongoose.model("StudentOrder", schema);
