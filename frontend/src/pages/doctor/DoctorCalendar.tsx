// import { Calendar, Clock, Video, Users, FileText } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';

// const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

// const mockSchedule: Record<string, Record<string, 'available' | 'booked' | 'unavailable'>> = {
//   Mon: { '9:00 AM': 'booked', '10:00 AM': 'booked', '11:00 AM': 'available', '2:00 PM': 'available' },
//   Tue: { '9:00 AM': 'available', '10:00 AM': 'booked', '11:00 AM': 'available' },
//   Wed: { '9:00 AM': 'available', '10:00 AM': 'available' },
//   Thu: { '9:00 AM': 'booked', '10:00 AM': 'booked', '11:00 AM': 'booked', '2:00 PM': 'available' },
//   Fri: { '9:00 AM': 'available', '10:00 AM': 'available', '11:00 AM': 'available' },
// };

// const DoctorCalendar = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="font-display text-2xl font-bold text-secondary">Schedule & Calendar</h1>
//           <Button><Calendar className="h-4 w-4 mr-2" />Set Availability</Button>
//         </div>

//         <div className="bg-card rounded-xl shadow-card border overflow-x-auto">
//           <div className="min-w-[700px]">
//             <div className="grid grid-cols-8 border-b">
//               <div className="p-4 font-medium text-muted-foreground">Time</div>
//               {weekDays.map((day) => (
//                 <div key={day} className="p-4 font-semibold text-secondary text-center border-l">{day}</div>
//               ))}
//             </div>
//             {timeSlots.map((time) => (
//               <div key={time} className="grid grid-cols-8 border-b last:border-0">
//                 <div className="p-4 text-sm text-muted-foreground">{time}</div>
//                 {weekDays.map((day) => {
//                   const status = mockSchedule[day]?.[time];
//                   return (
//                     <div key={day} className="p-2 border-l">
//                       {status && (
//                         <div className={cn('p-2 rounded-lg text-xs font-medium text-center', {
//                           'bg-success/10 text-success': status === 'available',
//                           'bg-info/10 text-info': status === 'booked',
//                           'bg-muted text-muted-foreground': status === 'unavailable',
//                         })}>
//                           {status === 'booked' ? 'Booked' : status === 'available' ? 'Open' : '—'}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorCalendar;






















import { Calendar, Clock, Video, Users, FileText, X, User, ArrowRight, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDoctorAppointments } from '@/services/appointment.service';
import type { Appointment } from '@/types/appointment';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

// Helper function to convert 24-hour time to 12-hour format
const formatTimeTo12Hour = (time24: string): string => {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// Helper function to get day name from date string (YYYY-MM-DD)
const getDayName = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  const dayIndex = date.getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayNames[dayIndex];
};

// Helper function to normalize time format (handles both "HH:MM" and "HH:MM AM/PM")
const normalizeTime = (time: string): string => {
  // If already in 12-hour format, return as is
  if (time.includes('AM') || time.includes('PM')) {
    return time;
  }
  // Convert 24-hour to 12-hour
  return formatTimeTo12Hour(time);
};

const DoctorCalendar = () => {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string; appointment: Appointment | null } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [demoDoctorId, setDemoDoctorId] = useState<string | null>(null);

  // Initialize demo data and get doctor ID
  useEffect(() => {
    const initializeDemoData = async () => {
      try {
        // Create demo data to get doctor ID
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const response = await fetch(`${API_BASE_URL}/appointments/demo`, { method: 'POST' });
        if (!response.ok) throw new Error('Failed to create demo data');
        const demoData = await response.json();
        setDemoDoctorId(demoData.doctor.id);
      } catch (err) {
        console.error('Failed to initialize demo data:', err);
        setError('Failed to initialize demo data. Make sure backend is running.');
      }
    };
    initializeDemoData();
  }, []);

  const fetchAppointments = async () => {
    if (!demoDoctorId) return; // Wait for demo data to be created
    
    try {
      setLoading(true);
      setError(null);
      const data = await getDoctorAppointments(demoDoctorId);
      setAppointments(data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (demoDoctorId) {
      fetchAppointments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoDoctorId]);

  // Build schedule from appointments
  const buildSchedule = (): Record<string, Record<string, 'available' | 'booked' | 'unavailable'>> => {
    const schedule: Record<string, Record<string, 'available' | 'booked' | 'unavailable'>> = {};

    // Initialize all slots as available
    weekDays.forEach(day => {
      schedule[day] = {};
      timeSlots.forEach(time => {
        schedule[day][time] = 'available';
      });
    });

    // Mark booked slots from appointments
    appointments.forEach(apt => {
      const day = getDayName(apt.date);
      const time = normalizeTime(apt.time);
      
      if (schedule[day] && schedule[day][time]) {
        schedule[day][time] = 'booked';
      }
    });

    return schedule;
  };

  // Build appointment details map
  const buildAppointmentDetails = (): Record<string, Appointment> => {
    const details: Record<string, Appointment> = {};
    
    appointments.forEach(apt => {
      const day = getDayName(apt.date);
      const time = normalizeTime(apt.time);
      const key = `${day}-${time}`;
      details[key] = apt;
    });

    return details;
  };

  const schedule = buildSchedule();
  const appointmentDetails = buildAppointmentDetails();

  const handleSlotClick = (day: string, time: string, status: 'available' | 'booked' | 'unavailable' | undefined) => {
    if (status === 'booked') {
      const appointment = appointmentDetails[`${day}-${time}`] || null;
      setSelectedSlot({ day, time, appointment });
    }
  };

  const selectedAppointment = selectedSlot?.appointment || null;

  return (
    <DoctorLayout>
      {/* Light Teal Background Container with white padding on all sides */}
      <div className="bg-primary/30 m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-3xl min-h-[calc(100%-4rem)]">
        <Breadcrumbs />
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-secondary/10">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-secondary tracking-tight">
                Schedule & Calendar
              </h1>
              <p className="text-secondary/60 mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Manage your availability and appointments
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" onClick={fetchAppointments} disabled={loading}>
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                Refresh
              </Button>
              <Button variant="hero" size="lg">
                <Calendar className="h-5 w-5" />
                Set Availability
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar Grid */}
            <div className={cn("bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden", selectedSlot ? "lg:col-span-2" : "lg:col-span-3")}>
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-8 border-b border-secondary/10 bg-primary/20">
                    <div className="p-4 font-semibold text-secondary">Time</div>
                    {weekDays.map((day) => (
                      <div key={day} className="p-4 font-semibold text-secondary text-center border-l border-secondary/10">
                        {day}
                      </div>
                    ))}
                  </div>
                  {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8 border-b border-secondary/10 last:border-0 hover:bg-primary/5 transition-colors duration-200">
                      <div className="p-4 text-sm font-medium text-secondary/70">{time}</div>
                      {weekDays.map((day) => {
                        const status = schedule[day]?.[time];
                        const isSelected = selectedSlot?.day === day && selectedSlot?.time === time;
                        return (
                          <div key={day} className="p-2 border-l border-secondary/10">
                            {status && (
                              <div 
                                onClick={() => handleSlotClick(day, time, status)}
                                className={cn('p-2 rounded-lg text-xs font-medium text-center transition-all duration-200 cursor-pointer', {
                                  'bg-success/10 text-success hover:bg-success/20': status === 'available',
                                  'bg-info/10 text-info hover:bg-info/20': status === 'booked' && !isSelected,
                                  'bg-info text-white shadow-md': status === 'booked' && isSelected,
                                  'bg-secondary/5 text-secondary/40': status === 'unavailable',
                                })}
                              >
                                {status === 'booked' ? 'Booked' : status === 'available' ? 'Open' : '—'}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointment Details Sidebar */}
            {selectedSlot && selectedAppointment && (
              <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden lg:col-span-1">
                <div className="px-6 py-4 border-b border-secondary/10 bg-primary/20 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-secondary">
                      Appointment Details
                    </h2>
                    <p className="text-sm text-secondary/60 mt-0.5">
                      {selectedSlot.day} • {selectedSlot.time}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedSlot(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Patient Info */}
                  <div className="p-4 rounded-xl border border-secondary/10 bg-primary/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/50 flex items-center justify-center">
                        <User className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-secondary">Patient</p>
                        <p className="text-xs text-secondary/60">Patient ID: {selectedAppointment.patientId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div>
                    <p className="text-sm text-secondary/60 mb-1">Date</p>
                    <p className="font-medium text-secondary">{selectedAppointment.date}</p>
                  </div>

                  <div>
                    <p className="text-sm text-secondary/60 mb-1">Time</p>
                    <p className="font-medium text-secondary">{selectedAppointment.time}</p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-4 border-t border-secondary/10">
                    <Link to={`/doctor/patient/${selectedAppointment.patientId}/history`} className="block">
                      <Button className="w-full shadow-sm">
                        <FileText className="h-4 w-4" />
                        View Patient History
                        <ArrowRight className="h-4 w-4 ml-auto" />
                      </Button>
                    </Link>
                    <Link to={`/doctor/video-call/dashboard`} className="block">
                      <Button variant="outline" className="w-full hover:bg-primary/30">
                        <Video className="h-4 w-4" />
                        Start Video Call
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="lg:col-span-3 flex items-center justify-center p-8">
                <p className="text-secondary/60">Loading appointments...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="lg:col-span-3 flex items-center justify-center p-8">
                <p className="text-destructive">{error}</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="bg-white rounded-2xl p-5 border border-secondary/10">
            <h3 className="font-semibold text-secondary mb-3">Legend</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-success/10 border border-success/20"></div>
                <span className="text-sm text-secondary/70">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-info/10 border border-info/20"></div>
                <span className="text-sm text-secondary/70">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-secondary/5 border border-secondary/10"></div>
                <span className="text-sm text-secondary/70">Unavailable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorCalendar;