export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor';
  avatar?: string;
}

export interface Patient extends User {
  role: 'patient';
  bloodGroup?: string;
  allergies?: string[];
  chronicConditions?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  rating: number;
  availability: TimeSlot[];
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  type: 'video' | 'in-person';
  notes?: string;
}

export interface Report {
  id: string;
  patientId: string;
  name: string;
  type: string;
  date: string;
  fileUrl: string;
  aiSummary?: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  medicines: Medicine[];
  instructions: string;
  followUpDate?: string;
  createdAt: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: 'before-meal' | 'after-meal' | 'with-meal';
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  distance: string;
  specialty: string;
  phone: string;
  rating: number;
  isOpen: boolean;

  lat: number;
  lng: number;
}

export interface AIPrediction {
  disease: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  suggestedDoctor: string;
  recommendations: string[];
}

export interface HealthPassport {
  qrCode: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  lastUpdated: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'medicine' | 'report' | 'alert';
  read: boolean;
  createdAt: string;
}
