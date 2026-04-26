const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial
} = require("../controllers/testimonialController");


// Public
router.get("/", getTestimonials);

// Admin
router.post("/", auth, createTestimonial);
router.delete("/:id", auth, deleteTestimonial);

module.exports = router;
