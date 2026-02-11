import express from "express";
import { createPrescription, getMyPrescriptionsDoctor } from "../controllers/doctor.controller.js";
import { getMyPrescriptions } from "../controllers/patient.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { updatePrescription } from "../controllers/prescription.controller.js";
const router = express.Router();

// Doctor writes prescription
router.post("/", protect, createPrescription);

// Doctor views his written prescriptions
router.get("/doctor/me", protect, getMyPrescriptionsDoctor);

// Patient views their prescriptions
router.get("/me", protect, getMyPrescriptions);

router.put("/:id", protect, updatePrescription);

export default router;
