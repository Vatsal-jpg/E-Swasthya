// import Patient from "../models/patient.model.js";
// import jwt from "jsonwebtoken";
// import { sendOTP } from "../utils/sendSms.utils.js";

// // Generate OTP
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// // Send OTP
// export const sendOtp = async (req, res) => {
//   try {
//     const { phone } = req.body;

//     let patient = await Patient.findOne({ phone });
//     if (!patient) patient = new Patient({ phone });

//     const otp = generateOTP();
//     patient.otp = otp;
//     patient.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
//     await patient.save();

//     await sendOTP(phone, otp);   // Twilio call
//     res.json({ message: "OTP sent to your phone" });

//   } catch (err) {
//     console.error("OTP ERROR:", err);   // 🔥 ADD THIS
//     res.status(500).json({ error: err.message });
//   }
// };


// // Verify OTP (Login/Register)
// export const verifyOtp = async (req, res) => {
//   try {
//     const { phone, otp, name } = req.body;

//     const patient = await Patient.findOne({ phone });
//     if (!patient) return res.status(404).json({ message: "Patient not found" });
//     console.log("DB OTP:", patient.otp);
// console.log("User OTP:", otp);
// console.log("Expiry:", patient.otpExpiry, "Now:", new Date());


//     if (patient.otp !== otp || patient.otpExpiry < new Date()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     patient.isVerified = true;
//     if (name) patient.name = name;
//     patient.otp = null;
//     patient.otpExpiry = null;

//     await patient.save();

//     const token = jwt.sign(
//       { id: patient._id, role: "patient" },
//       process.env.JWT_SECRET
//     );

//     res.json({ message: "Login successful", token, patient });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// import Prescription from "../models/prescription.model.js";

// export const getMyPrescriptions = async (req, res) => {
//   const prescriptions = await Prescription.find({ patient: req.user.id })
//     .populate("doctor", "name specialization")
//     .populate("appointment");
//   res.json(prescriptions);
// };



import Patient from "../models/patient.model.js";
import jwt from "jsonwebtoken";
import { sendOTP } from "../utils/sendSms.utils.js";
import Prescription from "../models/prescription.model.js";

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    let patient = await Patient.findOne({ phone });
    if (!patient) patient = new Patient({ phone });

    const otp = generateOTP();
    patient.otp = otp;
    patient.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await patient.save();

    await sendOTP(phone, otp);
    res.json({ message: "OTP sent to your phone" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp, name } = req.body;

    const patient = await Patient.findOne({ phone });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    if (patient.otp !== otp || patient.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    patient.isVerified = true;
    if (name) patient.name = name;
    patient.otp = null;
    patient.otpExpiry = null;
    await patient.save();

    const token = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.JWT_SECRET
    );

    res.json({ token, patient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Existing – unchanged
// import Prescription from "../models/prescription.model.js";

export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.user.id })
      .populate("doctor", "name")   // 👈 important
      .sort({ createdAt: -1 });

    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// 🔥 NEW – Derived medicine reminder data
export const getMedicineSchedule = async (req, res) => {
  const prescriptions = await Prescription.find({
    patient: req.user.id,
    status: "active"
  });

  const schedule = prescriptions.flatMap(p =>
    p.medicines.map(med => ({
      medicine: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      duration: med.duration,
      notes: med.notes,
      prescriptionId: p._id
    }))
  );

  res.json(schedule);
};
