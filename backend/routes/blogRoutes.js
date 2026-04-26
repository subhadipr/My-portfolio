const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");


// Public
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// Admin
router.post("/", auth, createBlog);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

module.exports = router;
