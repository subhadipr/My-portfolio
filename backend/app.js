const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

require("dotenv").config();

const errorMiddleware = require("./middleware/errorMiddleware");

// Routes Import
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const studentRoutes = require("./routes/studentRoutes");
const blogRoutes = require("./routes/blogRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

const app = express();

// ================= MIDDLEWARE =================

// Body Parser
app.use(express.json());

// Security
app.use(cors());
app.use(helmet());

// Compression
app.use(compression());

// Logger
app.use(morgan("dev"));

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/blog", blogRoutes);              // FIXED
app.use("/api/testimonial", testimonialRoutes); // FIXED

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("🚀 Subhadip Portfolio API Running");
});

// ================= ERROR HANDLER =================

app.use(errorMiddleware);

module.exports = app;
