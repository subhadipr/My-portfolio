const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  name: String,
  description: String,
  price: String

});

module.exports = mongoose.model("Service", schema);
