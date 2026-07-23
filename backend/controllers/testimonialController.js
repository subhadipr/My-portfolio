const Testimonial = require("../models/Testimonial");


exports.createTestimonial = async (req, res) => {
    try {
        const { clientName, review, rating, company } = req.body;

        const image = req.file
    ? req.file.path.replace(/\\/g, "/")
    : "";

        const newTestimonial = await Testimonial.create({
            clientName,
            review,
            rating,
            company,
            image
        });
        res.status(201).json(newTestimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All
exports.getTestimonials = async (req, res) => {
    try {
        const data = await Testimonial.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete
exports.deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
