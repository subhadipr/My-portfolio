const mongoose = require("mongoose");

const StudentOrderSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Please provide student name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      lowercase: true,
      trim: true,
    },
    college: {
      type: String,
      required: [true, "Please provide college name"],
    },
    project: {
      type: String,
      required: [true, "Project description is required"],
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    budget: {
      type: String,
      default: "-",
    },
    status: {
      type: String,
      enum: ["new", "pending", "completed", "cancelled"],
      default: "new",
    },
   
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("StudentOrder", StudentOrderSchema);