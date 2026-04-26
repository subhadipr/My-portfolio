const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  toggleFeatured
} = require("../controllers/projectController");


// Public
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);
router.patch("/feature/:id", auth, toggleFeatured);

module.exports = router;
