import express from "express";
import { createAppointment, getAppointments, rescheduleAppointment, createDemoData } from "../controllers/appointment.controller.js";
import { protect, protectPatient } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/book", protect, protectPatient, createAppointment);

// Create demo data for testing
router.post("/demo", createDemoData);

// Get appointments (supports doctorId or patientId query params)
router.get("/", getAppointments);

// Reschedule appointment (only updates date and time)
router.put("/:id/reschedule", rescheduleAppointment);

export default router;
