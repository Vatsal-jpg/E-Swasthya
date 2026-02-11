import axios from 'axios';
import type { Appointment } from '@/types/appointment';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Fetch appointments for a doctor
 */
export const getDoctorAppointments = async (doctorId: string): Promise<Appointment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`, {
      params: { doctorId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    throw error;
  }
};

/**
 * Fetch appointments for a patient
 */
export const getPatientAppointments = async (patientId: string): Promise<Appointment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`, {
      params: { patientId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    throw error;
  }
};

/**
 * Reschedule an appointment (only updates date and time)
 */
export const rescheduleAppointment = async (
  appointmentId: string,
  date: string,
  time: string
): Promise<Appointment> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/appointments/${appointmentId}/reschedule`,
      { date, time }
    );
    return response.data;
  } catch (error) {
    console.error('Error rescheduling appointment:', error);
    throw error;
  }
};

/**
 * Create demo data (patient, doctor, appointment) for testing
 */
export const createDemoData = async (): Promise<{
  patient: { id: string; name: string };
  doctor: { id: string; name: string };
  appointment: Appointment;
}> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments/demo`);
    return response.data;
  } catch (error) {
    console.error('Error creating demo data:', error);
    throw error;
  }
};
