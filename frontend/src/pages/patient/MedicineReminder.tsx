import { useState } from 'react';
import { Pill, Clock, Check, X, TrendingUp } from 'lucide-react';
import PatientLayout from '@/components/layouts/PatientLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { mockMedicines } from '@/data/mockData';
import { cn } from '@/lib/utils';

const medicineSchedule = [
  { time: '8:00 AM', medicines: [mockMedicines[0]], status: 'taken' },
  { time: '1:00 PM', medicines: [mockMedicines[1]], status: 'pending' },
  { time: '8:00 PM', medicines: [mockMedicines[1]], status: 'upcoming' },
];

const MedicineReminder = () => {
  const [adherence] = useState(85);

  return (
    <PatientLayout>
      <Breadcrumbs />

      <div className="space-y-6 p-6 bg-[#f1f5f5] min-h-screen">
        <h1 className="font-display text-3xl font-bold text-secondary">
          Medicine Reminder
        </h1>

        <div className="bg-card rounded-2xl shadow-card border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="font-semibold text-secondary">Weekly Adherence</p>
                <p className="text-sm text-muted-foreground">
                  Keep up the good work!
                </p>
              </div>
            </div>
            <span className="text-3xl font-bold text-success">{adherence}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full">
            <div className="h-full bg-success rounded-full" style={{ width: `${adherence}%` }} />
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-card border">
          <div className="p-6 border-b">
            <h2 className="font-semibold text-secondary">Active Medicines</h2>
          </div>

          <div className="divide-y">
            {medicineSchedule.map((schedule, index) => (
              <div
                key={index}
                className={cn(
                  'p-6 transition-colors',
                  schedule.status === 'pending' && 'bg-warning/5',
                  schedule.status === 'taken' && 'bg-success/5'
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold text-secondary">
                      {schedule.time}
                    </span>
                  </div>

                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium capitalize',
                      {
                        'bg-success/10 text-success': schedule.status === 'taken',
                        'bg-warning/10 text-warning': schedule.status === 'pending',
                        'bg-muted text-muted-foreground':
                          schedule.status === 'upcoming',
                      }
                    )}
                  >
                    {schedule.status}
                  </span>
                </div>

                {schedule.medicines.map((medicine, mIndex) => (
                  <div
                    key={mIndex}
                    className="flex items-center justify-between p-4 bg-card rounded-2xl border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <Pill className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">
                          {medicine.name} {medicine.dosage}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {medicine.timing.replace('-', ' ')}
                        </p>
                      </div>
                    </div>

                    {schedule.status !== 'upcoming' && (
                      <div className="flex gap-2">
                        {schedule.status === 'taken' ? (
                          <Button size="sm" variant="success" disabled>
                            <Check className="h-4 w-4 mr-1" />
                            Taken
                          </Button>
                        ) : (
                          <>
                            <Button size="sm" variant="success">
                              <Check className="h-4 w-4 mr-1" />
                              Taken
                            </Button>
                            <Button size="sm" variant="outline">
                              <X className="h-4 w-4 mr-1" />
                              Skip
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default MedicineReminder;
