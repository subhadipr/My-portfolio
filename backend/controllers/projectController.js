const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const data = await Project.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const data = await Project.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Single Project
exports.getProjectById = async (req, res) => {
  try {
    const data = await Project.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const data = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Toggle Featured
exports.toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.featured = !project.featured;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
};
