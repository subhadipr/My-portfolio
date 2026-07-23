const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

const errorMiddleware = require("./middleware/errorMiddleware");

// ================= IMPORT ROUTES =================
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
app.use(express.urlencoded({ extended: true }));

// Security
app.use(cors());
app.use(helmet());

// Compression
app.use(compression());

// Logger
app.use(morgan("dev"));

// ================= STATIC FILES =================

// Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/blog", blogRoutes);

// ✅ Fixed (Frontend-এর সাথে মিল রেখে)
app.use("/api/testimonial", testimonialRoutes);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
    res.send("🚀 Subhadip Portfolio API Running");
});

// ================= ERROR HANDLER =================

app.use(errorMiddleware);

module.exports = app;