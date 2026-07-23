const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createStudentOrder,
  getStudentOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/studentController");

router.post("/order", createStudentOrder); // Public
router.get("/orders", auth, getStudentOrders); // Protected
router.get("/orders/:id", auth, getSingleOrder); 
router.put("/orders/:id", auth, updateOrder); 
router.delete("/orders/:id", auth, deleteOrder);

module.exports = router;