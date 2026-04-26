const StudentProject = require("../models/StudentProject");
const StudentOrder = require("../models/StudentOrder");

// Student Project List
exports.getStudentProjects = async (req, res) => {
  res.json(await StudentProject.find());
};

// Create Student Project (Admin)
exports.createStudentProject = async (req, res) => {
  res.json(await StudentProject.create(req.body));
};

// Create Order
exports.createStudentOrder = async (req, res) => {
  res.json(await StudentOrder.create(req.body));
};

// Get Orders (Admin)
exports.getStudentOrders = async (req, res) => {
  res.json(await StudentOrder.find().sort({ createdAt: -1 }));
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  res.json(await StudentOrder.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  ));
};
