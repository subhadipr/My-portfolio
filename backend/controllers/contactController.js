const Contact = require("../models/Contact");
const { errorLogger } = require("../utils/logger");

// Create Contact
exports.createContact = async (req, res) => {
  try {

    const data = await Contact.create(req.body);
    res.status(201).json(data);

  } catch (error) {

    errorLogger(error.message);

    res.status(500).json({
      message: "Failed to create contact"
    });

  }
};

// Get All Contacts
exports.getContacts = async (req, res) => {
  try {

    const data = await Contact.find().sort({ createdAt: -1 });
    res.json(data);

  } catch (error) {

    errorLogger(error.message);

    res.status(500).json({
      message: "Failed to fetch contacts"
    });

  }
};

// Update Contact Status
exports.updateContactStatus = async (req, res) => {
  try {

    const data = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(data);

  } catch (error) {

    errorLogger(error.message);

    res.status(500).json({
      message: "Failed to update contact"
    });

  }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Contact Deleted"
    });

  } catch (error) {

    errorLogger(error.message);

    res.status(500).json({
      message: "Failed to delete contact"
    });

  }
};
