const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    createContact,
    getContacts,
    getContactById,
    updateContactStatus,
    deleteContact
} = require("../controllers/contactController");

// ===============================
// PUBLIC
// ===============================
router.post("/", createContact);

// ===============================
// ADMIN
// ===============================
router.get("/", auth, getContacts);

router.get("/:id", auth, getContactById);

router.patch("/:id", auth, updateContactStatus);

router.delete("/:id", auth, deleteContact);

module.exports = router;