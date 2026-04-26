const { errorLogger } = require("../utils/logger");

module.exports = (err, req, res, next) => {

  errorLogger(err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || "Server Error"
  });

};
