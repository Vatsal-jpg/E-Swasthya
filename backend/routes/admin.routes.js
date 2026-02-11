import express from "express";
import { adminLogin, getPendingDoctors, updateDoctorStatus } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/doctors/pending", getPendingDoctors);
router.put("/doctor/:id/status", updateDoctorStatus);

export default router;
