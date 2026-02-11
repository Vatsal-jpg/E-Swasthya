import {
  User,
  Mail,
  Phone,
  Droplet,
  AlertCircle,
  Heart,
  Clock,
  Edit,
} from 'lucide-react';

import PatientLayout from '@/components/layouts/PatientLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { mockPatient, mockAppointments } from '@/data/mockData';
import HealthPassportQR from '@/components/health/HealthPassportQR';

const PatientProfile = () => {
  const completedAppointments = mockAppointments.filter(
    (a) => a.status === 'completed'
  );

  return (
    <PatientLayout>
      <Breadcrumbs />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-card rounded-xl shadow-card border overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent h-32" />
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
              <div className="w-24 h-24 rounded-full bg-secondary border-4 border-card flex items-center justify-center">
                <User className="h-12 w-12 text-secondary-foreground" />
              </div>

              <div className="flex-1">
                <h1 className="font-display text-2xl font-bold text-secondary">
                  {mockPatient.name}
                </h1>
                <p className="text-muted-foreground">
                  Patient ID: {mockPatient.id.toUpperCase()}
                </p>
              </div>

              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* ================= QR HEALTH PASSPORT (ADDED HERE) ================= */}
        <HealthPassportQR />

        {/* ================= PERSONAL + MEDICAL DETAILS ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="bg-card rounded-xl shadow-card border p-6">
            <h2 className="font-semibold text-secondary mb-4">
              Personal Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/50 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-secondary">
                    {mockPatient.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/50 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-secondary">
                    {mockPatient.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Droplet className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-medium text-secondary">
                    {mockPatient.bloodGroup}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-card rounded-xl shadow-card border p-6">
            <h2 className="font-semibold text-secondary mb-4">
              Medical Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Allergies</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {mockPatient.allergies?.map((allergy, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Chronic Conditions
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {mockPatient.chronicConditions?.map((condition, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-info/10 text-info rounded-full text-sm"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MEDICAL HISTORY ================= */}
        <div className="bg-card rounded-xl shadow-card border p-6">
          <h2 className="font-semibold text-secondary mb-4">
            Medical History
          </h2>

          <div className="space-y-4">
            {completedAppointments.map((appointment, index) => (
              <div key={appointment.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-success" />
                  </div>
                  {index < completedAppointments.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>

                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-secondary">
                      {appointment.doctorName}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {appointment.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {appointment.notes || 'General consultation'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= EMERGENCY CONTACT ================= */}
        <div className="bg-card rounded-xl shadow-card border p-6">
          <h2 className="font-semibold text-secondary mb-4">
            Emergency Contact
          </h2>

          <div className="flex items-center gap-4 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <Phone className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-secondary">
                {mockPatient.emergencyContact?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {mockPatient.emergencyContact?.relation} •{' '}
                {mockPatient.emergencyContact?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientProfile;
