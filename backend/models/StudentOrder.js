const mongoose = require("mongoose");

const StudentOrderSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    plan: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    message: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["new", "pending", "completed", "cancelled"],
        default: "new"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("StudentOrder", StudentOrderSchema);