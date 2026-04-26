const Testimonial = require("../models/Testimonial");

// Create
exports.createTestimonial = async (req, res) => {
  res.json(await Testimonial.create(req.body));
};

// Get All
exports.getTestimonials = async (req, res) => {
  res.json(await Testimonial.find().sort({ createdAt: -1 }));
};

// Delete
exports.deleteTestimonial = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
