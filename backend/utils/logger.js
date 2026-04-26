const fs = require("fs");
const path = require("path");

// Log File Path
const logFilePath = path.join(__dirname, "../logs/error.log");

// Error Logger Function
exports.errorLogger = (message) => {

  const time = new Date().toISOString();

  const logMessage = `[${time}] ERROR: ${message}\n`;

  try {

    fs.appendFileSync(logFilePath, logMessage);

  } catch (err) {

    console.error("Log Write Failed:", err.message);

  }

};
