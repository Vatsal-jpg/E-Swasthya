import express from "express";
import {
  registerDoctor,
  loginDoctor,
  getTodayQueue,
  getDoctorCalendar,
  getPatientHistory,
  createPrescription,
  joinAppointment
} from "../controllers/doctor.controller.js";

import { protect, protectDoctor } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import Appointment from "../models/appointment.model.js";
// import { joinAppointment } from "../controllers/doctor.controller.js";
import { getMyWrittenPrescriptions } from "../controllers/doctor.controller.js";
const router = express.Router();

/* =======================
   Doctor Registration
======================= */
router.get("/ping", (req, res) => {
  res.send("doctor route working");
});

router.post(
  "/register",
  upload.fields([
    { name: "license", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "educationCert", maxCount: 10 }
  ]),
  registerDoctor
);

/* =======================
   Doctor Login
======================= */
router.post("/login", loginDoctor);

/* =======================
   Protected Doctor Routes
======================= */
router.get("/queue/today", protect, protectDoctor, getTodayQueue);
router.get("/calendar", protect, protectDoctor, getDoctorCalendar);
router.get("/history/:patientId", protect, protectDoctor, getPatientHistory);

/* =======================
   Prescription + PDF
======================= */
router.post(
  "/prescription",
  protect,
  protectDoctor,
  createPrescription
);

/* =======================
   Join Video Consultation
======================= */
router.get(
  "/join/:appointmentId",
  protect,
  protectDoctor,
  joinAppointment
);

export default router;
