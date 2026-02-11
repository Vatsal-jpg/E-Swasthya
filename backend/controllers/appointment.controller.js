import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";
import { mapSymptomToSpecialization } from "../utils/symptomMapper.utils.js";
import mongoose from "mongoose";

export const createAppointment = async (req, res) => {
  try {
    const { symptoms, date, timeSlot } = req.body;

    const specialization = mapSymptomToSpecialization(symptoms);

    const doctor = await Doctor.findOne({ specialization });

    if (!doctor) {
      return res.status(404).json({ message: "No doctor available currently" });
    }

    const queueCount = await Appointment.countDocuments({
      doctor: doctor._id,
      date
    });

    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctor._id,
      date,
      timeSlot,
      reason: symptoms,
      queueNumber: queueCount + 1
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId: appointment._id,
      assignedSpecialist: specialization,
      assignedDoctor: doctor.name,
      queueNumber: appointment.queueNumber
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get appointments - supports filtering by doctorId or patientId
 * GET /appointments?doctorId=... or GET /appointments?patientId=...
 */
export const getAppointments = async (req, res) => {
  try {
    const { doctorId, patientId } = req.query;

    let query = {};

    if (doctorId) {
      // Validate ObjectId format - if invalid, return empty array (for development)
      if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        console.warn(`Invalid doctorId format: ${doctorId}. Returning empty array.`);
        return res.status(200).json([]);
      }
      query.doctor = doctorId;
    }

    if (patientId) {
      // Validate ObjectId format - if invalid, return empty array (for development)
      if (!mongoose.Types.ObjectId.isValid(patientId)) {
        console.warn(`Invalid patientId format: ${patientId}. Returning empty array.`);
        return res.status(200).json([]);
      }
      query.patient = patientId;
    }

    const appointments = await Appointment.find(query)
      .populate("patient", "name phone")
      .populate("doctor", "name specialization")
      .sort({ date: 1, timeSlot: 1 });

    // Transform to match frontend Appointment type
    const transformedAppointments = appointments.map((apt) => ({
      id: apt._id.toString(),
      patientId: apt.patient._id.toString(),
      doctorId: apt.doctor._id.toString(),
      date: apt.date,
      time: apt.timeSlot,
    }));

    res.status(200).json(transformedAppointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Reschedule an appointment - only updates date and time
 * PUT /appointments/:id/reschedule
 */
export const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid appointment ID format" });
    }

    // Validate required fields
    if (!date || !time) {
      return res.status(400).json({ error: "date and time are required" });
    }

    // Find appointment
    const appointment = await Appointment.findById(id)
      .populate("patient", "name phone")
      .populate("doctor", "name specialization");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update only date and timeSlot (time)
    appointment.date = date;
    appointment.timeSlot = time;
    await appointment.save();

    // Return transformed appointment
    const transformedAppointment = {
      id: appointment._id.toString(),
      patientId: appointment.patient._id.toString(),
      doctorId: appointment.doctor._id.toString(),
      date: appointment.date,
      time: appointment.timeSlot,
    };

    res.status(200).json(transformedAppointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create demo data for testing - creates patient, doctor, and appointment
 * POST /appointments/demo
 */
export const createDemoData = async (req, res) => {
  try {
    // Create or find demo patient
    let patient = await Patient.findOne({ phone: "9999999999" });
    if (!patient) {
      patient = new Patient({
        name: "Demo Patient",
        phone: "9999999999",
        email: "demo@patient.com",
        age: 30,
        gender: "Male",
        isVerified: true
      });
      await patient.save();
    }

    // Create or find demo doctor
    let doctor = await Doctor.findOne({ email: "demo@doctor.com" });
    if (!doctor) {
      doctor = new Doctor({
        name: "Dr. Demo Doctor",
        email: "demo@doctor.com",
        password: "demo123", // In production, hash this
        medicalRegNumber: "DEMO123",
        registrationAuthority: "Medical Council",
        licenseCertificateUrl: "demo",
        idType: "Aadhaar",
        idNumber: "123456789012",
        idProofUrl: "demo",
        specialization: "General Physician",
        experience: 10,
        isVerified: true
      });
      await doctor.save();
    }

    // Create demo appointment (7 days from now)
    const demoDate = new Date();
    demoDate.setDate(demoDate.getDate() + 7);
    const dateStr = demoDate.toISOString().split('T')[0]; // YYYY-MM-DD

    // Check if demo appointment already exists
    let appointment = await Appointment.findOne({
      patient: patient._id,
      doctor: doctor._id,
      date: dateStr
    });

    if (!appointment) {
      appointment = new Appointment({
        patient: patient._id,
        doctor: doctor._id,
        date: dateStr,
        timeSlot: "10:00",
        status: "booked",
        reason: "Demo appointment for testing"
      });
      await appointment.save();
    }

    // Return the created/found data
    res.status(200).json({
      message: "Demo data ready",
      patient: {
        id: patient._id.toString(),
        name: patient.name,
        phone: patient.phone
      },
      doctor: {
        id: doctor._id.toString(),
        name: doctor.name,
        specialization: doctor.specialization
      },
      appointment: {
        id: appointment._id.toString(),
        patientId: patient._id.toString(),
        doctorId: doctor._id.toString(),
        date: appointment.date,
        time: appointment.timeSlot
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
