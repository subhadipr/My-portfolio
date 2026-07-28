const Contact = require("../models/Contact");
const { errorLogger } = require("../utils/logger");

// ===============================
// CREATE CONTACT
// ===============================
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

// ===============================
// GET ALL CONTACTS
// ===============================
exports.getContacts = async (req, res) => {
    try {

        const data = await Contact.find().sort({
            createdAt: -1
        });

        res.json(data);

    } catch (error) {

        errorLogger(error.message);

        res.status(500).json({
            message: "Failed to fetch contacts"
        });

    }
};

// ===============================
// GET SINGLE CONTACT
// ===============================
exports.getContactById = async (req, res) => {

    try {

        const data = await Contact.findById(req.params.id);

        if (!data) {

            return res.status(404).json({
                message: "Contact not found"
            });

        }

        res.json(data);

    } catch (error) {

        errorLogger(error.message);

        res.status(500).json({
            message: "Failed to fetch contact"
        });

    }

};

// ===============================
// UPDATE STATUS
// ===============================
exports.updateContactStatus = async (req, res) => {

    try {

        const data = await Contact.findByIdAndUpdate(

            req.params.id,

            {
                status: req.body.status
            },

            {
                new: true
            }

        );

        if (!data) {

            return res.status(404).json({
                message: "Contact not found"
            });

        }

        res.json(data);

    } catch (error) {

        errorLogger(error.message);

        res.status(500).json({
            message: "Failed to update contact"
        });

    }

};

// ===============================
// DELETE CONTACT
// ===============================
exports.deleteContact = async (req, res) => {

    try {

        const data = await Contact.findByIdAndDelete(req.params.id);

        if (!data) {

            return res.status(404).json({
                message: "Contact not found"
            });

        }

        res.json({
            message: "Contact deleted successfully"
        });

    } catch (error) {

        errorLogger(error.message);

        res.status(500).json({
            message: "Failed to delete contact"
        });

    }

};