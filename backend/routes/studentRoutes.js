const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getStudentProjects,
  createStudentProject,
  createStudentOrder,
  getStudentOrders,
  updateOrderStatus
} = require("../controllers/studentController");


// Public
router.get("/projects", getStudentProjects);
router.post("/order", createStudentOrder);

// Admin
router.post("/projects", auth, createStudentProject);
router.get("/orders", auth, getStudentOrders);
router.patch("/orders/:id", auth, updateOrderStatus);

module.exports = router;
