import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degreeName: String,
  instituteName: String,
  yearOfCompletion: Number,
  certificateUrl: String   // uploaded file path
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Medical Registration
  medicalRegNumber: { type: String, required: true },
  registrationAuthority: { type: String, required: true },
  registrationYear: { type: Number },
  licenseCertificateUrl: { type: String, required: true },

  // Education (Repeatable)
  education: [educationSchema],

  // Government ID
  idType: {
    type: String,
    enum: ["Aadhaar", "PAN", "Passport"],
    required: true
  },
  idNumber: { type: String, required: true },
  idProofUrl: { type: String, required: true },

  specialization: String,
  experience: Number,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  isVerified: { type: Boolean, default: false } // kept for backward compatibility, sync with status='approved'
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);
