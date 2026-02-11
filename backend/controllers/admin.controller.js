import Doctor from "../models/doctor.model.js";
import jwt from "jsonwebtoken";

// Admin Login (Hardcoded for now)
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded credentials
        // In production, use database and bcrypt
        if (email === "admin@thakurData.com" && password === "admin") {
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
            return res.json({ token, message: "Admin logged in successfully" });
        }

        return res.status(401).json({ message: "Invalid admin credentials" });
    } catch (err) {
        console.error("Admin Login Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get Pending Doctors
export const getPendingDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: "pending" }).select("-password");
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Doctor Status (Approve/Reject)
export const updateDoctorStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // "approved" or "rejected"

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const doctor = await Doctor.findByIdAndUpdate(
            id,
            {
                status,
                isVerified: status === "approved" // Sync legacy field
            },
            { new: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ message: `Doctor ${status} successfully`, doctor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
