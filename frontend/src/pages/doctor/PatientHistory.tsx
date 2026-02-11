// import { FileText, Brain, Pill, Calendar, User, TrendingUp } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { mockPatient, mockReports, mockAppointments, mockMedicines } from '@/data/mockData';
// import StatusBadge from '@/components/shared/StatusBadge';

// const PatientHistory = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
//             <User className="h-8 w-8 text-secondary" />
//           </div>
//           <div>
//             <h1 className="font-display text-2xl font-bold text-secondary">{mockPatient.name}</h1>
//             <p className="text-muted-foreground">Blood Group: {mockPatient.bloodGroup} • Allergies: {mockPatient.allergies?.join(', ')}</p>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-card rounded-xl shadow-card border p-6">
//             <h2 className="font-semibold text-secondary mb-4 flex items-center gap-2"><Calendar className="h-5 w-5" />Past Visits</h2>
//             <div className="space-y-3">
//               {mockAppointments.map((apt) => (
//                 <div key={apt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                   <div>
//                     <p className="font-medium text-secondary">{apt.date}</p>
//                     <p className="text-sm text-muted-foreground">{apt.notes || 'Consultation'}</p>
//                   </div>
//                   <StatusBadge status={apt.status} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-card rounded-xl shadow-card border p-6">
//             <h2 className="font-semibold text-secondary mb-4 flex items-center gap-2"><FileText className="h-5 w-5" />Reports</h2>
//             <div className="space-y-3">
//               {mockReports.map((report) => (
//                 <div key={report.id} className="p-3 bg-muted/50 rounded-lg">
//                   <p className="font-medium text-secondary">{report.name}</p>
//                   <p className="text-sm text-muted-foreground">{report.date} • {report.type}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-card rounded-xl shadow-card border p-6">
//             <h2 className="font-semibold text-secondary mb-4 flex items-center gap-2"><Pill className="h-5 w-5" />Current Medications</h2>
//             <div className="space-y-3">
//               {mockMedicines.map((med, i) => (
//                 <div key={i} className="p-3 bg-muted/50 rounded-lg">
//                   <p className="font-medium text-secondary">{med.name} {med.dosage}</p>
//                   <p className="text-sm text-muted-foreground">{med.frequency} • {med.duration}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-card rounded-xl shadow-card border p-6">
//             <h2 className="font-semibold text-secondary mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5" />Medicine Adherence</h2>
//             <div className="text-center py-8">
//               <p className="text-4xl font-bold text-success">85%</p>
//               <p className="text-muted-foreground mt-2">Weekly adherence rate</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default PatientHistory;




















import { FileText, Brain, Pill, Calendar, User, TrendingUp, Download, Eye } from 'lucide-react';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { mockPatient, mockReports, mockAppointments, mockMedicines } from '@/data/mockData';
import StatusBadge from '@/components/shared/StatusBadge';

const PatientHistory = () => {
  return (
    <DoctorLayout>
      {/* Light Teal Background Container with white padding on all sides */}
      <div className="bg-primary/30 m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-3xl min-h-[calc(100%-4rem)]">
        <Breadcrumbs />
        
        <div className="space-y-6">
          {/* Patient Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-secondary/10">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="font-display text-3xl font-bold text-secondary tracking-tight">
                  {mockPatient.name}
                </h1>
                <p className="text-secondary/70 mt-1">
                  Blood Group: <span className="font-semibold">{mockPatient.bloodGroup}</span> • 
                  Allergies: <span className="font-semibold">{mockPatient.allergies?.join(', ')}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg" className="hover:bg-primary/30">
                <Download className="h-5 w-5" />
                Export History
              </Button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Past Visits */}
            <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="px-6 py-4 border-b border-secondary/10 bg-primary/20">
                <h2 className="font-display text-xl font-semibold text-secondary flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Past Visits
                </h2>
                <p className="text-sm text-secondary/60 mt-0.5">Consultation history</p>
              </div>
              <div className="p-5 space-y-3">
                {mockAppointments.map((apt) => (
                  <div 
                    key={apt.id} 
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-secondary">{apt.date}</p>
                      <p className="text-sm text-secondary/70 mt-1">{apt.notes || 'General Consultation'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={apt.status} />
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Reports */}
            <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="px-6 py-4 border-b border-secondary/10 bg-primary/20">
                <h2 className="font-display text-xl font-semibold text-secondary flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medical Reports
                </h2>
                <p className="text-sm text-secondary/60 mt-0.5">Lab results and documents</p>
              </div>
              <div className="p-5 space-y-3">
                {mockReports.map((report) => (
                  <div 
                    key={report.id} 
                    className="p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-secondary">{report.name}</p>
                        <p className="text-sm text-secondary/60 mt-1">
                          {report.date} • {report.type}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="px-6 py-4 border-b border-secondary/10 bg-primary/20">
                <h2 className="font-display text-xl font-semibold text-secondary flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Current Medications
                </h2>
                <p className="text-sm text-secondary/60 mt-0.5">Active prescriptions</p>
              </div>
              <div className="p-5 space-y-3">
                {mockMedicines.map((med, i) => (
                  <div 
                    key={i} 
                    className="p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200"
                  >
                    <p className="font-semibold text-secondary">
                      {med.name} <span className="text-secondary/60 font-normal">{med.dosage}</span>
                    </p>
                    <p className="text-sm text-secondary/60 mt-1">
                      {med.frequency} • {med.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Medicine Adherence */}
            <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="px-6 py-4 border-b border-secondary/10 bg-primary/20">
                <h2 className="font-display text-xl font-semibold text-secondary flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Medicine Adherence
                </h2>
                <p className="text-sm text-secondary/60 mt-0.5">Compliance tracking</p>
              </div>
              <div className="p-8 text-center">
                <div className="mb-4">
                  <p className="text-5xl font-bold text-secondary">85%</p>
                </div>
                <p className="text-secondary/70 font-medium">Weekly adherence rate</p>
                <p className="text-sm text-secondary/50 mt-1">Last updated: Today</p>
              </div>
            </div>
          </div>

          {/* Health Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg text-center">
              <p className="text-2xl font-bold text-secondary">12</p>
              <p className="text-sm text-secondary/60 mt-1">Total Visits</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg text-center">
              <p className="text-2xl font-bold text-secondary">8</p>
              <p className="text-sm text-secondary/60 mt-1">Reports</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg text-center">
              <p className="text-2xl font-bold text-secondary">3</p>
              <p className="text-sm text-secondary/60 mt-1">Active Meds</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg text-center">
              <p className="text-2xl font-bold text-secondary">85%</p>
              <p className="text-sm text-secondary/60 mt-1">Adherence</p>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default PatientHistory;