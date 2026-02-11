// import { Link } from 'react-router-dom';
// import { Video, Users, FileText, Clock, Calendar, AlertCircle, Phone, User } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import QuickActionCard from '@/components/shared/QuickActionCard';
// import StatusBadge from '@/components/shared/StatusBadge';
// import { Button } from '@/components/ui/button';
// import { mockDoctor, mockAppointments } from '@/data/mockData';

// const todaysAppointments = [
//   { id: '1', patientName: 'Rajesh Kumar', time: '10:00 AM', type: 'video' as const, status: 'scheduled' as const },
//   { id: '2', patientName: 'Priya Sharma', time: '11:30 AM', type: 'video' as const, status: 'scheduled' as const },
//   { id: '3', patientName: 'Amit Patel', time: '2:00 PM', type: 'video' as const, status: 'scheduled' as const },
// ];

// const patientQueue = [
//   { id: '1', name: 'Rajesh Kumar', waitTime: '5 min', issue: 'Blood pressure review' },
//   { id: '2', name: 'Priya Sharma', waitTime: '15 min', issue: 'Diabetes follow-up' },
// ];

// const criticalAlerts = [
//   { id: '1', patient: 'Mohan Das', message: 'Blood sugar levels critical', severity: 'high' as const },
//   { id: '2', patient: 'Sita Rani', message: 'Missed medication 2 days', severity: 'medium' as const },
// ];

// const DoctorDashboard = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />

//       <div className="space-y-8">
//         {/* Welcome Section */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
//               Good Morning, {mockDoctor.name}! 🩺
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               You have {todaysAppointments.length} appointments today
//             </p>
//           </div>
//           <Link to="/doctor/video-call/demo">
//             <Button variant="hero" size="lg">
//               <Video className="h-5 w-5 mr-2" />
//               Start Next Call
//             </Button>
//           </Link>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid md:grid-cols-4 gap-6">
//           <div className="bg-card rounded-xl p-6 shadow-card border">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
//                 <Calendar className="h-6 w-6 text-info" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-secondary">{todaysAppointments.length}</p>
//                 <p className="text-sm text-muted-foreground">Today's Appointments</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-card rounded-xl p-6 shadow-card border">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
//                 <Users className="h-6 w-6 text-warning" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-secondary">{patientQueue.length}</p>
//                 <p className="text-sm text-muted-foreground">In Queue</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-card rounded-xl p-6 shadow-card border">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
//                 <AlertCircle className="h-6 w-6 text-destructive" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-secondary">{criticalAlerts.length}</p>
//                 <p className="text-sm text-muted-foreground">Critical Alerts</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-card rounded-xl p-6 shadow-card border">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
//                 <FileText className="h-6 w-6 text-success" />
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-secondary">24</p>
//                 <p className="text-sm text-muted-foreground">This Week</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Today's Appointments */}
//           <div className="lg:col-span-2 bg-card rounded-xl shadow-card border">
//             <div className="p-6 border-b">
//               <div className="flex items-center justify-between">
//                 <h2 className="font-display text-xl font-semibold text-secondary">
//                   Today's Appointments
//                 </h2>
//                 <Link to="/doctor/calendar">
//                   <Button variant="ghost" size="sm">View Calendar</Button>
//                 </Link>
//               </div>
//             </div>
//             <div className="divide-y">
//               {todaysAppointments.map((apt) => (
//                 <div key={apt.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
//                       <User className="h-5 w-5 text-secondary" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-secondary">{apt.patientName}</p>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Clock className="h-3 w-3" />
//                         <span>{apt.time}</span>
//                         <span className="text-xs bg-info/10 text-info px-2 py-0.5 rounded-full capitalize">
//                           {apt.type}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Link to={`/doctor/patient/p1/history`}>
//                       <Button variant="ghost" size="sm">
//                         <FileText className="h-4 w-4" />
//                       </Button>
//                     </Link>
//                     <Link to={`/doctor/video-call/${apt.id}`}>
//                       <Button size="sm">
//                         <Video className="h-4 w-4 mr-2" />
//                         Start
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Patient Queue */}
//           <div className="bg-card rounded-xl shadow-card border">
//             <div className="p-6 border-b">
//               <h2 className="font-display text-xl font-semibold text-secondary">
//                 Patient Queue
//               </h2>
//             </div>
//             <div className="p-4 space-y-4">
//               {patientQueue.map((patient, index) => (
//                 <div key={patient.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
//                   <span className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-medium">
//                     {index + 1}
//                   </span>
//                   <div className="flex-1">
//                     <p className="font-medium text-secondary">{patient.name}</p>
//                     <p className="text-sm text-muted-foreground">{patient.issue}</p>
//                   </div>
//                   <span className="text-sm text-warning font-medium">{patient.waitTime}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Critical Alerts & Quick Actions */}
//         <div className="grid lg:grid-cols-2 gap-6">
//           {/* Critical Alerts */}
//           <div className="bg-card rounded-xl shadow-card border">
//             <div className="p-6 border-b">
//               <h2 className="font-display text-xl font-semibold text-secondary">
//                 Critical Alerts
//               </h2>
//             </div>
//             <div className="p-4 space-y-4">
//               {criticalAlerts.map((alert) => (
//                 <div key={alert.id} className="flex items-start gap-4 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
//                   <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
//                     <AlertCircle className="h-5 w-5 text-destructive" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium text-secondary">{alert.patient}</p>
//                     <p className="text-sm text-muted-foreground">{alert.message}</p>
//                   </div>
//                   <StatusBadge status={alert.severity} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div>
//             <h2 className="font-display text-xl font-semibold text-secondary mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <QuickActionCard
//                 icon={Video}
//                 title="Start Call"
//                 to="/doctor/video-call/demo"
//                 variant="primary"
//               />
//               <QuickActionCard
//                 icon={Users}
//                 title="Patient History"
//                 to="/doctor/patient/p1/history"
//               />
//               <QuickActionCard
//                 icon={FileText}
//                 title="Write Prescription"
//                 to="/doctor/reports"
//               />
//               <QuickActionCard
//                 icon={Clock}
//                 title="Follow-ups"
//                 to="/doctor/follow-ups"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorDashboard;





















import { Link } from 'react-router-dom';
import { Video, Users, FileText, Clock, Calendar, AlertCircle, User, ArrowRight } from 'lucide-react';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import QuickActionCard from '@/components/shared/QuickActionCard';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { mockDoctor, mockAppointments } from '@/data/mockData';

const todaysAppointments = [
  { id: '1', patientName: 'Rajesh Kumar', time: '10:00 AM', type: 'video' as const, status: 'scheduled' as const },
  { id: '2', patientName: 'Priya Sharma', time: '11:30 AM', type: 'video' as const, status: 'scheduled' as const },
  { id: '3', patientName: 'Amit Patel', time: '2:00 PM', type: 'video' as const, status: 'scheduled' as const },
];

const patientQueue = [
  { id: '1', name: 'Rajesh Kumar', waitTime: '5 min', issue: 'Blood pressure review' },
  { id: '2', name: 'Priya Sharma', waitTime: '15 min', issue: 'Diabetes follow-up' },
];

const criticalAlerts = [
  { id: '1', patient: 'Mohan Das', message: 'Blood sugar levels critical', severity: 'high' as const },
  { id: '2', patient: 'Sita Rani', message: 'Missed medication 2 days', severity: 'medium' as const },
];

const DoctorDashboard = () => {
  return (
    <DoctorLayout>
      {/* Light Teal Background Container with white padding on all sides */}
      <div className="bg-primary/30 m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-3xl min-h-[calc(100%-4rem)]">
        <Breadcrumbs />

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-4 border-b border-secondary/10">
            <div className="space-y-2">
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-secondary tracking-tight">
                Good Morning, {mockDoctor.name}
              </h1>
              <p className="text-secondary/60 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Thursday, January 22, 2026 · {todaysAppointments.length} appointments today
              </p>
            </div>
            <Link to={`/doctor/video-call/${todaysAppointments[0]?.id}`}>
              <Button variant="hero" size="lg">
                <Video className="h-5 w-5" />
                Start Next Call
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
              <p className="text-sm text-secondary/60 mb-2">Today's Appointments</p>
              <p className="text-3xl font-bold text-secondary">{todaysAppointments.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
              <p className="text-sm text-secondary/60 mb-2">In Queue</p>
              <p className="text-3xl font-bold text-secondary">{patientQueue.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
              <p className="text-sm text-secondary/60 mb-2">Critical Alerts</p>
              <p className="text-3xl font-bold text-secondary">{criticalAlerts.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
              <p className="text-sm text-secondary/60 mb-2">This Week</p>
              <p className="text-3xl font-bold text-secondary">24</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Today's Appointments */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-secondary/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-secondary/10 bg-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-secondary">
                      Today's Schedule
                    </h2>
                    <p className="text-sm text-secondary/60 mt-0.5">Manage your appointments</p>
                  </div>
                  <Link to="/doctor/calendar">
                    <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary hover:bg-primary/30">
                      View Calendar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-secondary/10">
                {todaysAppointments.map((apt) => (
                  <div 
                    key={apt.id} 
                    className="group p-5 hover:bg-primary/10 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-secondary text-base mb-1">{apt.patientName}</h3>
                        <div className="flex items-center gap-3 text-sm text-secondary/60">
                          <span>{apt.time}</span>
                          <span>•</span>
                          <span>Video Call</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Link to={`/doctor/patient/p1/history`}>
                          <Button variant="ghost" size="sm" className="hover:bg-primary/30">
                            View History
                          </Button>
                        </Link>
                        <Link to={`/doctor/video-call/${apt.id}`}>
                          <Button size="sm" className="shadow-sm">
                            Start Call
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Queue */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-secondary/10 overflow-hidden">
              <div className="px-5 py-4 border-b border-secondary/10 bg-primary/20">
                <h2 className="font-display text-lg font-semibold text-secondary">
                  Patient Queue
                </h2>
                <p className="text-xs text-secondary/60 mt-0.5">Waiting patients</p>
              </div>
              <div className="p-4 space-y-3">
                {patientQueue.map((patient, index) => (
                  <div 
                    key={patient.id} 
                    className="p-4 rounded-xl bg-primary/30 hover:bg-primary/50 border border-secondary/10 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-secondary">{patient.name}</p>
                      <span className="text-xs text-secondary/60">{patient.waitTime}</span>
                    </div>
                    <p className="text-sm text-secondary/60">{patient.issue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Critical Alerts */}
            <div className="bg-white rounded-2xl border border-secondary/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-secondary/10 bg-primary/20">
                <h2 className="font-display text-lg font-semibold text-secondary">
                  Critical Alerts
                </h2>
                <p className="text-sm text-secondary/60 mt-0.5">Requires immediate attention</p>
              </div>
              <div className="p-5 space-y-3">
                {criticalAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="p-4 bg-primary/20 hover:bg-primary/30 border border-secondary/10 rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-semibold text-secondary text-sm">{alert.patient}</p>
                      <StatusBadge status={alert.severity} />
                    </div>
                    <p className="text-sm text-secondary/60">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="mb-4">
                <h2 className="font-display text-lg font-semibold text-secondary">Quick Actions</h2>
                <p className="text-sm text-secondary/60 mt-0.5">Frequently used tools</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to={`/doctor/video-call/${todaysAppointments[0].id}`}
                  className="bg-secondary text-white rounded-2xl p-5 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="font-semibold mb-1">Start Call</h3>
                  <p className="text-xs text-white/70">Begin consultation</p>
                </Link>

                <Link 
                  to="/doctor/patient/p1/history"
                  className="bg-white hover:bg-primary/20 rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300"
                >
                  <h3 className="font-semibold text-secondary mb-1">Patient History</h3>
                  <p className="text-xs text-secondary/60">View records</p>
                </Link>

                <Link 
                  to="/doctor/reports"
                  className="bg-white hover:bg-primary/20 rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300"
                >
                  <h3 className="font-semibold text-secondary mb-1">Prescription</h3>
                  <p className="text-xs text-secondary/60">Create new Rx</p>
                </Link>

                <Link 
                  to="/doctor/follow-ups"
                  className="bg-white hover:bg-primary/20 rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300"
                >
                  <h3 className="font-semibold text-secondary mb-1">Follow-ups</h3>
                  <p className="text-xs text-secondary/60">Pending tasks</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;