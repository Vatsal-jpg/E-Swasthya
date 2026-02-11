import express from "express";
import { sendSOS } from "../controllers/sos.controller.js";

const router = express.Router();

// POST /api/sos - Send SOS alert
router.post("/", sendSOS);

export default router;
