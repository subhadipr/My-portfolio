require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;


// ================= START SERVER =================

const startServer = async () => {

  try {

    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server Running On Port ${PORT}`);
    });

  } catch (error) {

    console.error("❌ Server Start Failed:", error.message);
    process.exit(1);

  }

};

startServer();


