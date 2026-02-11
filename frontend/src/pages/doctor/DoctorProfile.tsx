// import { User, Mail, Phone, Stethoscope, GraduationCap, Clock, Star, Edit } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { mockDoctor } from '@/data/mockData';

// const DoctorProfile = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />
//       <div className="max-w-4xl mx-auto space-y-6">
//         <div className="bg-card rounded-xl shadow-card border overflow-hidden">
//           <div className="bg-gradient-to-r from-secondary to-secondary/80 h-32" />
//           <div className="px-6 pb-6">
//             <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
//               <div className="w-24 h-24 rounded-full bg-primary border-4 border-card flex items-center justify-center">
//                 <Stethoscope className="h-12 w-12 text-secondary" />
//               </div>
//               <div className="flex-1">
//                 <h1 className="font-display text-2xl font-bold text-secondary">{mockDoctor.name}</h1>
//                 <p className="text-muted-foreground">{mockDoctor.specialization}</p>
//               </div>
//               <Button><Edit className="h-4 w-4 mr-2" />Edit Profile</Button>
//             </div>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-card rounded-xl shadow-card border p-6 space-y-4">
//             <h2 className="font-semibold text-secondary">Professional Details</h2>
//             <div className="flex items-center gap-4"><GraduationCap className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Qualification</p><p className="font-medium">{mockDoctor.qualification}</p></div></div>
//             <div className="flex items-center gap-4"><Clock className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Experience</p><p className="font-medium">{mockDoctor.experience} years</p></div></div>
//             <div className="flex items-center gap-4"><Star className="h-5 w-5 text-warning" /><div><p className="text-sm text-muted-foreground">Rating</p><p className="font-medium">{mockDoctor.rating}/5</p></div></div>
//           </div>

//           <div className="bg-card rounded-xl shadow-card border p-6 space-y-4">
//             <h2 className="font-semibold text-secondary">Contact Information</h2>
//             <div className="flex items-center gap-4"><Mail className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{mockDoctor.email}</p></div></div>
//             <div className="flex items-center gap-4"><Phone className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Phone</p><p className="font-medium">{mockDoctor.phone}</p></div></div>
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorProfile;

















import { Stethoscope, Edit, CheckCircle } from 'lucide-react';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { mockDoctor } from '@/data/mockData';

const DoctorProfile = () => {
  return (
    <DoctorLayout>
      {/* Container styling preserved exactly as requested */}
      <div className="bg-primary/30 m-4 md:m-6 lg:m-8 p-4 md:p-6 lg:p-8 rounded-3xl min-h-[calc(100%-4rem)]">
        
        <div className="flex justify-between items-center mb-6">
           <Breadcrumbs />
           <span className="text-xs font-medium text-secondary/50">
              ID: #DOC-{Math.floor(Math.random() * 10000)}
           </span>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* 1. HERO SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-secondary/10 overflow-hidden">
            {/* Minimalist Gradient Cover */}
            <div className="bg-secondary/5 h-32 border-b border-secondary/5" />
            
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-12">
                
                {/* Avatar Placeholder */}
                <div className="w-32 h-32 rounded-2xl bg-white p-1.5 shadow-lg">
                  <div className="w-full h-full rounded-xl bg-primary/20 flex items-center justify-center border border-secondary/5">
                    <Stethoscope className="h-12 w-12 text-secondary/80" />
                  </div>
                </div>

                {/* Identity Info - Clean Text Only */}
                <div className="flex-1 pt-2 md:pt-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-3xl font-bold text-secondary tracking-tight">
                      {mockDoctor.name}
                    </h1>
                    {/* Kept verified badge as it is functional status, not decoration */}
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-secondary/70 text-lg font-medium">
                    {mockDoctor.specialization}
                  </p>
                  <p className="text-sm text-secondary/50">
                    Senior Consultant • Dept. of Cardiology
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <Button variant="outline" className="border-secondary/20 hover:bg-secondary/5 text-secondary">
                    Public View
                  </Button>
                  <Button variant="hero" className="gap-2 shadow-lg shadow-primary/20">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. KEY METRICS - Text Based */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              value="1,250+"
              label="Patients Treated"
            />
             <StatCard 
              value={`${mockDoctor.rating}/5.0`}
              label="Patient Rating"
            />
            <StatCard 
              value="98%"
              label="Success Rate"
            />
             <StatCard 
              value="12 Years"
              label="Experience"
            />
          </div>

          {/* 3. DETAILS GRID */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left Column: Professional Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-secondary/10 p-8 h-full">
                <h2 className="font-display text-lg font-bold text-secondary mb-6 pb-4 border-b border-secondary/5">
                  Professional Information
                </h2>

                <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
                  <TextItem 
                    label="Qualification"
                    value={mockDoctor.qualification}
                    sub="University of Medical Sciences, 2015"
                  />
                  <TextItem 
                    label="Specialization"
                    value={mockDoctor.specialization}
                    sub="Board Certified"
                  />
                   <TextItem 
                    label="Current Status"
                    value="Available"
                    sub="Mon - Fri, 09:00 AM - 05:00 PM"
                  />
                  <TextItem 
                    label="Consultation Fee"
                    value="$120.00"
                    sub="Per session (Includes follow-up)"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Contact Information */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-secondary/10 p-8 h-full flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold text-secondary mb-6 pb-4 border-b border-secondary/5">
                    Contact Details
                  </h2>

                  <div className="space-y-8">
                    <TextItem 
                      label="Email Address"
                      value={mockDoctor.email}
                    />
                    <TextItem 
                      label="Phone Number"
                      value={mockDoctor.phone}
                    />
                    <TextItem 
                      label="Office Location"
                      value="Room 304, Building B"
                      sub="Main City Hospital Campus"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-secondary/5">
                   <p className="text-xs text-secondary/40 text-center">
                     Private & Confidential Data
                   </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

// --- Minimalist Sub-Components ---

const StatCard = ({ value, label }) => (
  <div className="bg-white p-6 rounded-2xl border border-secondary/10 shadow-sm hover:border-secondary/20 transition-all duration-300 text-center md:text-left">
    <p className="text-3xl font-bold text-secondary tracking-tight mb-1">{value}</p>
    <p className="text-sm font-medium text-secondary/50 uppercase tracking-wide">{label}</p>
  </div>
);

const TextItem = ({ label, value, sub }) => (
  <div className="flex flex-col">
    <span className="text-xs font-semibold text-secondary/40 uppercase tracking-wider mb-1.5">
      {label}
    </span>
    <span className="text-base font-medium text-secondary">
      {value}
    </span>
    {sub && (
      <span className="text-sm text-secondary/60 mt-0.5">
        {sub}
      </span>
    )}
  </div>
);

export default DoctorProfile;