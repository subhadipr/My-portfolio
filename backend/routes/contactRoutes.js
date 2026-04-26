const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact
} = require("../controllers/contactController");


// Public
router.post("/", createContact);

// Admin Protected
router.get("/", auth, getContacts);
router.patch("/:id", auth, updateContactStatus);
router.delete("/:id", auth, deleteContact);

module.exports = router;
