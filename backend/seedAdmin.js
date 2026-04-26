require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");

// ⭐ IMPORTANT — Force Model Load After Connection
let User;

const seedAdmin = async () => {

    try {

        console.log("🚀 Starting Admin Seeder...");

        await connectDB();

        // Load Model AFTER DB Connect
        User = require("./models/User");

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminName = process.env.ADMIN_NAME;

        if (!adminEmail || !adminPassword) {
            throw new Error("ADMIN ENV VALUES MISSING");
        }

        // Check if Admin Exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("✅ Admin Already Exists — Seeder Skipped");
            process.exit(0);
        }

        // Create Admin
        const admin = await User.create({
            name: adminName,
            email: adminEmail,
            password: adminPassword,
            role: "admin"
        });

        console.log("🔥 Admin Created Successfully");
        console.log("📧 Email:", adminEmail);

        process.exit(0);

    } catch (error) {

        console.error("❌ Seeder Error:", error.message);
        process.exit(1);

    }

};

seedAdmin();
