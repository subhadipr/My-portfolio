const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  featureName: String,

  enabled: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model("FeatureToggle", schema);
