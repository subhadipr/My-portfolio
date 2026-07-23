const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../middleware/authMiddleware");

const {
    createTestimonial,
    getTestimonials,
    deleteTestimonial
} = require("../controllers/testimonialController");

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Public
router.get("/", getTestimonials);

// Admin
router.post("/", auth, upload.single("image"), createTestimonial);

router.delete("/:id", auth, deleteTestimonial);

module.exports = router;