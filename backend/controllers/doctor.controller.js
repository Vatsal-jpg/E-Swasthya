import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import Prescription from "../models/prescription.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generatePrescriptionPDF } from "../services/prescriptionPdf.service.js";


// Doctor Signup
export const registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      medicalRegNumber,
      registrationAuthority,
      registrationYear,
      idType,
      idNumber,
      specialization,
      experience
    } = req.body;

    if (!req.files?.license?.[0]) {
      return res.status(400).json({ error: "License certificate is required" });
    }

    if (!req.files?.idProof?.[0]) {
      return res.status(400).json({ error: "ID proof is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const educationData = JSON.parse(req.body.education || "[]");

    // Map education certificates to education entries
    const educationCertFiles = req.files.educationCert || [];

    const educationWithCertificates = educationData.map((edu, index) => ({
      ...edu,
      certificateUrl: educationCertFiles[index]?.path || null
    }));

    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      medicalRegNumber,
      registrationAuthority,
      registrationYear: registrationYear ? parseInt(registrationYear) : undefined,
      licenseCertificateUrl: req.files.license[0].path,
      education: educationWithCertificates,
      idType,
      idNumber,
      idProofUrl: req.files.idProof[0].path,
      specialization,
      experience: experience ? parseInt(experience) : undefined
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor registered successfully. Please wait for admin approval.", doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =======================
   Doctor Login
======================= */
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    if (doctor.status === "pending") {
      return res.status(403).json({ message: "Account pending approval. Please wait for admin verification." });
    }
    if (doctor.status === "rejected") {
      return res.status(403).json({ message: "Account rejected. Please contact support." });
    }

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET
    );

    res.json({ token, doctor });
  } catch (err) {
    console.error("Doctor Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =======================
   Today's Queue
======================= */
export const getTodayQueue = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const appointments = await Appointment.find({
      doctor: req.user.id,
      date: today
    })
      .sort({ queueNumber: 1 })
      .populate("patient");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =======================
   Calendar Appointments
======================= */
export const getDoctorCalendar = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =======================
   Patient History
======================= */
export const getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    const history = await Appointment.find({
      doctor: req.user.id,
      patient: patientId,
      status: "completed"
    }).populate("patient");

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Write Prescription
// import mongoose from "mongoose";
export const createPrescription = async (req, res) => {
  try {
    const { patientId, diagnosis, severity, medicines, advice } = req.body;

    const prescription = await Prescription.create({
      doctor: req.user.id,
      patient: patientId,
      diagnosis,
      severity,
      medicines,
      advice
    });

    const populated = await prescription.populate("patient", "name age gender phone");

    res.status(201).json(populated);
  } catch (err) {
    console.error("Create prescription error:", err);
    res.status(500).json({ error: err.message });
  }
};







//joinAppointment
export const joinAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId)
      .populate("patient")
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctor._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({
      message: "Doctor joined consultation",
      appointment
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyPrescriptionsDoctor = async (req, res) => {
  const prescriptions = await Prescription.find({ doctor: req.user.id })
    .populate("patient", "name age gender phone")   // 👈 THIS IS THE FIX
    .sort({ createdAt: -1 });

  res.json(prescriptions);
};


export const getMyWrittenPrescriptions = async (req, res) => {
  const prescriptions = await Prescription.find({ doctor: req.user.id })
    .populate("patient", "name phone")
    .populate("appointment");

  res.json(prescriptions);
};