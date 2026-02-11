import React from 'react';
import { Pill, AlertTriangle } from 'lucide-react';
import PatientLayout from '@/components/layouts/PatientLayout';
import { Button } from '@/components/ui/button';
import { mockAppointments, mockPatient, mockMedicines } from '@/data/mockData';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = React.useState(false);

  const upcomingAppointment = mockAppointments.find(
    (a) => a.status === 'scheduled'
  );
  const lastConsultation = mockAppointments.find(
    (a) => a.status === 'completed'
  );

  /* ---------------- MEDICINE REMINDER STATE ---------------- */
  const [scheduleData, setScheduleData] = React.useState<
    {
      time: string;
      medicines: typeof mockMedicines;
      status: 'taken' | 'pending' | 'upcoming' | 'skipped';
    }[]
  >([
    { time: '8:00 AM', medicines: [mockMedicines[0]], status: 'taken' },
    { time: '1:00 PM', medicines: [mockMedicines[1]], status: 'pending' },
    { time: '8:00 PM', medicines: [mockMedicines[1]], status: 'upcoming' },
  ]);

  const updateStatus = (
    index: number,
    status: 'taken' | 'skipped'
  ) => {
    setScheduleData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status } : item
      )
    );
  };

  const adherence = React.useMemo(() => {
    const valid = scheduleData.filter(
      (s) => s.status !== 'upcoming'
    );
    if (!valid.length) return 0;
    return Math.round(
      (valid.filter((s) => s.status === 'taken').length /
        valid.length) *
      100
    );
  }, [scheduleData]);

  // SOS Handler
  const handleSOS = React.useCallback(() => {
    // Request user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Location available - send SOS with coordinates
        const sosData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        axios.post(`${API_BASE_URL}/sos`, sosData)
          .then((res) => {
            const selected = res.data?.hospitalsSelected || [];
            const title = selected.length
              ? "SOS alert sent to nearby hospitals"
              : "SOS alert sent";
            const description = selected.length
              ? selected
                .map(
                  (h) =>
                    `• ${h.name}${h.distanceKm != null ? ` (${h.distanceKm} km)` : ""} — ${h.reasonForSelection}`
                )
                .join("\n")
              : "Alert sent. No facility details available.";
            toast.success(title, { description });
          })
          .catch((err) => {
            console.error('SOS request failed:', err);
            toast.error("SOS request failed. Please try again.");
          });
      },
      (error) => {
        // Location permission denied or unavailable
        console.error('Location error:', error);
        toast.error("Location permission denied. Please enable location access for SOS to work.");
      },
      { timeout: 10000, maximumAge: 0, enableHighAccuracy: true }
    );
  }, []);

  const handleJoinCall = () => {
    if (!upcomingAppointment) return;

    setIsJoining(true);

    // Play the animation/video for a few seconds then navigate
    setTimeout(() => {
      setIsJoining(false); // Clean up state (optional if navigating away)
      navigate(`/patient/video-call/${upcomingAppointment.id}`);
    }, 4500); // 4.5s delay to let the animation play a bit
  };

  return (
    <PatientLayout>
      {/* JOINING OVERLAY */}
      {isJoining && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <video
            src="/loading.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
          {/* Optional Overlay Text or branding if needed, but video might have it */}
        </div>
      )}

      <div
        className="space-y-6 p-6"
        style={{ backgroundColor: '#f1f5f5', minHeight: '100vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">
            Good morning, {mockPatient.name}
          </h1>
          <p className="text-sm text-[#6B7280]">
            Thursday, January 22, 2026
          </p>
        </div>

        {/* Top Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Appointment */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">
              Upcoming Appointment
            </h2>

            {upcomingAppointment ? (
              <>
                <p className="font-medium text-[#1A1A1A]">
                  {upcomingAppointment.doctorName}
                </p>
                <p className="text-sm text-[#6B7280] mb-6">
                  {upcomingAppointment.date} ·{' '}
                  {upcomingAppointment.time}
                </p>
                <Button
                  className="w-full bg-[#E5E7EB] text-[#1A1A1A] hover:bg-[#d1d5db]"
                  onClick={handleJoinCall}
                >
                  Join Video Call
                </Button>
              </>
            ) : (
              <p className="text-[#9CA3AF]">
                No upcoming appointments
              </p>
            )}
          </div>

          {/* Last Consultation */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
            <h2 className="text-xl font-semibold mb-4 text-[#1A1A1A]">
              Last Consultation Summary
            </h2>

            {lastConsultation ? (
              <>
                <p className="text-sm text-[#6B7280] mb-3">
                  Last consultation on Feb 7 for routine
                  check-up. Blood pressure normal.
                </p>
                <p className="text-sm text-[#6B7280]">
                  Vitamin D supplements prescribed.
                </p>
              </>
            ) : (
              <p className="text-[#9CA3AF]">
                No consultations yet
              </p>
            )}
          </div>
        </div>

        {/* 🟢 MEDICINE REMINDER */}

        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#1A1A1A]">
              Medicine Reminder
            </h2>
            <span className="text-sm font-medium text-[#065F46]">
              {adherence}%
            </span>
          </div>

          {/* Adherence bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all"
              style={{
                width: `${adherence}%`,
                backgroundColor:
                  adherence >= 90 ? '#10B981' : '#F59E0B',
              }}
            />
          </div>

          {/* Today’s medicines */}
          <div className="space-y-3">
            {scheduleData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-xl bg-[#F9FAFB]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#E5E7EB] rounded-lg flex items-center justify-center">
                    <Pill className="h-4 w-4 text-[#374151]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {item.medicines[0].name}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      {item.time}
                    </p>
                  </div>
                </div>

                {item.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateStatus(index, 'taken')
                      }
                      className="px-3 py-1 text-xs rounded-lg bg-[#D1FAE5] text-[#065F46]"
                    >
                      Taken
                    </button>
                    <button
                      onClick={() =>
                        updateStatus(index, 'skipped')
                      }
                      className="px-3 py-1 text-xs rounded-lg bg-[#FEE2E2] text-[#991B1B]"
                    >
                      Skip
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-[#6B7280] capitalize">
                    {item.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EVERYTHING BELOW THIS REMAINS AS IT WAS */}
      </div>

      {/* SOS Button - Fixed position, Dashboard only */}
      <button
        onClick={handleSOS}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="SOS Emergency"
      >
        <AlertTriangle className="h-8 w-8" />
      </button>
    </PatientLayout>
  );
};

export default PatientDashboard;
