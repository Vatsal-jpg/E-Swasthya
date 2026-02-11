import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true, unique: true },

  email: { type: String },   // optional
  age: Number,
  gender: String,
  address: String,

  otp: String,
  otpExpiry: Date,
  isVerified: { type: Boolean, default: false },

  // Emergency contact (optional - no migration needed)
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  }

}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
