// import express from "express";
// import { sendOtp, verifyOtp } from "../controllers/patient.controller.js";
// import { protect, protectPatient } from "../middlewares/auth.middleware.js";
// import { getMyPrescriptions } from "../controllers/patient.controller.js";
// const router = express.Router();

// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
// router.get("/prescriptions", protect, protectPatient, getMyPrescriptions);

// export default router;











import express from "express";
import { sendOtp, verifyOtp, getMyPrescriptions, getMedicineSchedule } from "../controllers/patient.controller.js";
import { protect, protectPatient } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.get("/prescriptions", protect, protectPatient, getMyPrescriptions);
router.get("/medicine-schedule", protect, protectPatient, getMedicineSchedule);

export default router;
