// import { Clock, User, Calendar, Bell } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';

// const followUps = [
//   { id: '1', patient: 'Rajesh Kumar', date: 'Jan 30, 2025', reason: 'Blood pressure review', reminder: true },
//   { id: '2', patient: 'Priya Sharma', date: 'Feb 5, 2025', reason: 'Diabetes follow-up', reminder: true },
//   { id: '3', patient: 'Amit Patel', date: 'Feb 10, 2025', reason: 'Post-surgery check', reminder: false },
// ];

// const DoctorFollowUps = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="font-display text-2xl font-bold text-secondary">Follow-up Management</h1>
//           <Button><Clock className="h-4 w-4 mr-2" />Schedule Follow-up</Button>
//         </div>

//         <div className="bg-card rounded-xl shadow-card border overflow-hidden">
//           <div className="divide-y">
//             {followUps.map((followUp) => (
//               <div key={followUp.id} className="p-6 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
//                     <User className="h-6 w-6 text-secondary" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-secondary">{followUp.patient}</p>
//                     <p className="text-sm text-muted-foreground">{followUp.reason}</p>
//                     <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
//                       <Calendar className="h-3 w-3" />
//                       {followUp.date}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <Bell className="h-4 w-4 text-muted-foreground" />
//                     <Switch checked={followUp.reminder} />
//                   </div>
//                   <Button variant="outline" size="sm">Reschedule</Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorFollowUps;
















// import { Clock, User, Calendar, Bell } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';

// const followUps = [
//   { id: '1', patient: 'Rajesh Kumar', date: 'Jan 30, 2025', reason: 'Blood pressure review', reminder: true },
//   { id: '2', patient: 'Priya Sharma', date: 'Feb 5, 2025', reason: 'Diabetes follow-up', reminder: true },
//   { id: '3', patient: 'Amit Patel', date: 'Feb 10, 2025', reason: 'Post-surgery check', reminder: false },
// ];

// const DoctorFollowUps = () => {
//   return (
//     <DoctorLayout>
//       {/* Light Teal Background Container with white padding on all sides */}
//       <div className="bg-primary/30 m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-3xl min-h-[calc(100%-4rem)]">
//         <Breadcrumbs />
        
//         <div className="space-y-6">
//           {/* Header Section */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-secondary/10">
//             <div>
//               <h1 className="font-display text-3xl lg:text-4xl font-bold text-secondary tracking-tight">
//                 Follow-up Management
//               </h1>
//               <p className="text-secondary/60 mt-1 flex items-center gap-2">
//                 <Clock className="h-4 w-4" />
//                 Track and schedule patient follow-ups
//               </p>
//             </div>
//             <Button variant="hero" size="lg">
//               <Clock className="h-5 w-5" />
//               Schedule Follow-up
//             </Button>
//           </div>

//           {/* Follow-ups List */}
//           <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden">
//             <div className="divide-y divide-secondary/10">
//               {followUps.map((followUp) => (
//                 <div 
//                   key={followUp.id} 
//                   className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-primary/10 transition-all duration-200"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0">
//                       <User className="h-6 w-6 text-secondary" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-secondary text-base">{followUp.patient}</p>
//                       <p className="text-sm text-secondary/70 mt-0.5">{followUp.reason}</p>
//                       <div className="flex items-center gap-2 mt-1.5 text-sm text-secondary/60">
//                         <Calendar className="h-3.5 w-3.5" />
//                         {followUp.date}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4 sm:ml-auto">
//                     <div className="flex items-center gap-2">
//                       <Bell className="h-4 w-4 text-secondary/60" />
//                       <Switch checked={followUp.reminder} />
//                     </div>
//                     <Button variant="outline" size="sm" className="hover:bg-primary/30">
//                       Reschedule
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Stats Summary */}
//           <div className="grid sm:grid-cols-3 gap-4">
//             <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
//               <p className="text-sm text-secondary/60 mb-2">Upcoming This Week</p>
//               <p className="text-3xl font-bold text-secondary">3</p>
//             </div>
//             <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
//               <p className="text-sm text-secondary/60 mb-2">Reminders Set</p>
//               <p className="text-3xl font-bold text-secondary">2</p>
//             </div>
//             <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
//               <p className="text-sm text-secondary/60 mb-2">Completed This Month</p>
//               <p className="text-3xl font-bold text-secondary">12</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorFollowUps;

// import { Clock, User, Calendar, Bell } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';

// const followUps = [
//   { id: '1', patient: 'Rajesh Kumar', date: 'Jan 30, 2025', reason: 'Blood pressure review', reminder: true },
//   { id: '2', patient: 'Priya Sharma', date: 'Feb 5, 2025', reason: 'Diabetes follow-up', reminder: true },
//   { id: '3', patient: 'Amit Patel', date: 'Feb 10, 2025', reason: 'Post-surgery check', reminder: false },
// ];

// const DoctorFollowUps = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="font-display text-2xl font-bold text-secondary">Follow-up Management</h1>
//           <Button><Clock className="h-4 w-4 mr-2" />Schedule Follow-up</Button>
//         </div>

//         <div className="bg-card rounded-xl shadow-card border overflow-hidden">
//           <div className="divide-y">
//             {followUps.map((followUp) => (
//               <div key={followUp.id} className="p-6 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
//                     <User className="h-6 w-6 text-secondary" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-secondary">{followUp.patient}</p>
//                     <p className="text-sm text-muted-foreground">{followUp.reason}</p>
//                     <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
//                       <Calendar className="h-3 w-3" />
//                       {followUp.date}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <Bell className="h-4 w-4 text-muted-foreground" />
//                     <Switch checked={followUp.reminder} />
//                   </div>
//                   <Button variant="outline" size="sm">Reschedule</Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorFollowUps;
















import { Clock, User, Calendar, Bell } from 'lucide-react';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const followUps = [
  { id: '1', patient: 'Rajesh Kumar', date: 'Jan 30, 2025', reason: 'Blood pressure review', reminder: true },
  { id: '2', patient: 'Priya Sharma', date: 'Feb 5, 2025', reason: 'Diabetes follow-up', reminder: true },
  { id: '3', patient: 'Amit Patel', date: 'Feb 10, 2025', reason: 'Post-surgery check', reminder: false },
];

const DoctorFollowUps = () => {
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
                Follow-up Management
              </h1>
              <p className="text-secondary/60 mt-1 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Track and schedule patient follow-ups
              </p>
            </div>
            <Button variant="hero" size="lg">
              <Clock className="h-5 w-5" />
              Schedule Follow-up
            </Button>
          </div>

          {/* Follow-ups List */}
          <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden">
            <div className="divide-y divide-secondary/10">
              {followUps.map((followUp) => (
                <div 
                  key={followUp.id} 
                  className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-primary/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary text-base">{followUp.patient}</p>
                      <p className="text-sm text-secondary/70 mt-0.5">{followUp.reason}</p>
                      <div className="flex items-center gap-2 mt-1.5 text-sm text-secondary/60">
                        <Calendar className="h-3.5 w-3.5" />
                        {followUp.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:ml-auto">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-secondary/60" />
                      <Switch checked={followUp.reminder} />
                    </div>
                    <Button variant="outline" size="sm" className="hover:bg-primary/30">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
              <p className="text-sm text-secondary/60 mb-2">Upcoming This Week</p>
              <p className="text-3xl font-bold text-secondary">3</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
              <p className="text-sm text-secondary/60 mb-2">Reminders Set</p>
              <p className="text-3xl font-bold text-secondary">2</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
              <p className="text-sm text-secondary/60 mb-2">Completed This Month</p>
              <p className="text-3xl font-bold text-secondary">12</p>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorFollowUps;