// import { FileText, Upload, Download, Plus, Send } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';

// const DoctorReports = () => {
//   return (
//     <DoctorLayout>
//       <Breadcrumbs />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="font-display text-2xl font-bold text-secondary">Reports & Prescriptions</h1>
//           <Button><Plus className="h-4 w-4 mr-2" />New Prescription</Button>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-card rounded-xl shadow-card border p-6">
//             <h2 className="font-semibold text-secondary mb-4">Write Prescription</h2>
//             <div className="space-y-4">
//               <Textarea placeholder="Enter prescription details, medications, dosage..." rows={8} />
//               <div className="flex gap-3">
//                 <Button className="flex-1"><FileText className="h-4 w-4 mr-2" />Generate PDF</Button>
//                 <Button variant="outline" className="flex-1"><Send className="h-4 w-4 mr-2" />Send to Patient</Button>
//               </div>
//             </div>
//           </div>

//           <div className="bg-card rounded-xl shadow-card border p-6">
//             <h2 className="font-semibold text-secondary mb-4">Upload Notes</h2>
//             <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-secondary/50 transition-colors cursor-pointer">
//               <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
//               <p className="text-muted-foreground">Drag and drop files or click to browse</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorReports;






// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FileText, Upload, Download, Plus, Send } from 'lucide-react';
// import DoctorLayout from '@/components/layouts/DoctorLayout';
// import Breadcrumbs from '@/components/shared/Breadcrumbs';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';

// const [prescriptions, setPrescriptions] = useState<any[]>([]);
// const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

// useEffect(() => {
//   axios.get("http://localhost:5001/api/prescriptions/doctor/me", {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//   }).then(res => setPrescriptions(res.data));
// }, []);

// const DoctorReports = () => {
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
//                 Reports & Prescriptions
//               </h1>
//               <p className="text-secondary/60 mt-1 flex items-center gap-2">
//                 <FileText className="h-4 w-4" />
//                 Create and manage medical documents
//               </p>
//             </div>
//             <Button variant="hero" size="lg">
//               <Plus className="h-5 w-5" />
//               New Prescription
//             </Button>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid lg:grid-cols-2 gap-6">
//             {/* Write Prescription Card */}
//             <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="mb-5 pb-4 border-b border-secondary/10">
//                 <h2 className="font-display text-xl font-semibold text-secondary">
//                   Write Prescription
//                 </h2>
//                 <p className="text-sm text-secondary/60 mt-1">
//                   Enter prescription details and medications
//                 </p>
//               </div>
              
//               <div className="space-y-4">
//                 <Textarea 
//                   placeholder="Enter prescription details, medications, dosage, instructions..." 
//                   rows={10}
//                   className="border-secondary/20 focus:border-secondary/40 rounded-xl"
//                 />
//                 <div className="flex gap-3">
//                   <Button className="flex-1 shadow-sm">
//                     <FileText className="h-4 w-4" />
//                     Generate PDF
//                   </Button>
//                   <Button variant="outline" className="flex-1 hover:bg-primary/30">
//                     <Send className="h-4 w-4" />
//                     Send to Patient
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Upload Notes Card */}
//             <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 p-6 hover:shadow-xl transition-all duration-300">
//               <div className="mb-5 pb-4 border-b border-secondary/10">
//                 <h2 className="font-display text-xl font-semibold text-secondary">
//                   Upload Medical Notes
//                 </h2>
//                 <p className="text-sm text-secondary/60 mt-1">
//                   Upload reports, scans, or documents
//                 </p>
//               </div>
              
//               <div className="border-2 border-dashed border-secondary/20 rounded-2xl p-12 text-center hover:border-secondary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer">
//                 <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-4">
//                   <Upload className="h-8 w-8 text-secondary" />
//                 </div>
//                 <p className="text-secondary/70 font-medium mb-1">
//                   Drag and drop files here
//                 </p>
//                 <p className="text-secondary/50 text-sm">
//                   or click to browse from your computer
//                 </p>
//                 <p className="text-xs text-secondary/40 mt-3">
//                   Supports: PDF, JPG, PNG (Max 10MB)
//                 </p>
//               </div>

//               <div className="mt-4">
//                 <Button variant="outline" className="w-full hover:bg-primary/30">
//                   <Download className="h-4 w-4" />
//                   Download Template
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Recent Prescriptions */}
//           <div className="bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden">
//             <div className="px-6 py-4 border-b border-secondary/10 bg-primary/20">
//               <h2 className="font-display text-xl font-semibold text-secondary">
//                 Recent Prescriptions
//               </h2>
//               <p className="text-sm text-secondary/60 mt-0.5">Last 5 prescriptions created</p>
//             </div>
//             <div className="divide-y divide-secondary/10">
//               {[
//                 { patient: 'Rajesh Kumar', date: 'Jan 22, 2026', type: 'General Prescription' },
//                 { patient: 'Priya Sharma', date: 'Jan 21, 2026', type: 'Diabetes Management' },
//                 { patient: 'Amit Patel', date: 'Jan 20, 2026', type: 'Post-Surgery Care' },
//               ].map((prescription, index) => (
//                 <div 
//                   key={index} 
//                   className="p-5 flex items-center justify-between hover:bg-primary/10 transition-all duration-200"
//                 >
//                   <div>
//                     <p className="font-semibold text-secondary">{prescription.patient}</p>
//                     <p className="text-sm text-secondary/60 mt-0.5">
//                       {prescription.type} • {prescription.date}
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="ghost" size="sm" className="hover:bg-primary/30">
//                       <FileText className="h-4 w-4" />
//                       View
//                     </Button>
//                     <Button variant="ghost" size="sm" className="hover:bg-primary/30">
//                       <Download className="h-4 w-4" />
//                       Download
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </DoctorLayout>
//   );
// };

// export default DoctorReports;

import axios from "axios";
import { useEffect, useState } from "react";
import { FileText, Plus, Edit, X } from "lucide-react";
import DoctorLayout from "@/components/layouts/DoctorLayout";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const DoctorReports = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    axios.get("http://localhost:5001/api/prescriptions/doctor/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setPrescriptions(res.data));
  }, []);

 const handleSave = async () => {
  const res = await axios.put(
    `http://localhost:5001/api/prescriptions/${selectedPrescription._id}`,
    selectedPrescription,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  // Update local list immediately
  setPrescriptions((prev) =>
    prev.map((p) => (p._id === res.data._id ? res.data : p))
  );

  alert("Prescription updated");
  setSelectedPrescription(null);
};


  return (
    <DoctorLayout>
      <div className="bg-primary/30 m-6 p-6 rounded-3xl">
        <Breadcrumbs />

        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Reports & Prescriptions</h1>
          {/* <Button><Plus /> New Prescription</Button> */}
        </div>

        <div className="bg-white rounded-xl shadow">
          {prescriptions.map((p) => (
            <div key={p._id} className="p-4 flex justify-between border-b">
              <div>
                <p className="font-semibold">{p.patient.name}</p>
                <p className="text-sm text-gray-500">{p.diagnosis}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { setMode("view"); setSelectedPrescription(p); }}>
                  <FileText size={16} /> View
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setMode("edit"); setSelectedPrescription(p); }}>
                  <Edit size={16} /> Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative">
            <Button className="absolute right-3 top-3" variant="ghost" onClick={() => setSelectedPrescription(null)}>
              <X />
            </Button>

            <h2 className="text-xl font-bold mb-4">
              {mode === "view" ? "View Prescription" : "Edit Prescription"}
            </h2>

            <Input
              disabled={mode === "view"}
              value={selectedPrescription.diagnosis}
              onChange={(e) => setSelectedPrescription({ ...selectedPrescription, diagnosis: e.target.value })}
              placeholder="Diagnosis"
            />

            <select
              disabled={mode === "view"}
              className="w-full border p-2 mt-2 rounded"
              value={selectedPrescription.severity}
              onChange={(e) => setSelectedPrescription({ ...selectedPrescription, severity: e.target.value })}
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>

            <Textarea
              disabled={mode === "view"}
              value={selectedPrescription.advice}
              onChange={(e) => setSelectedPrescription({ ...selectedPrescription, advice: e.target.value })}
              placeholder="Advice"
              className="mt-2"
            />

            <h3 className="mt-4 font-semibold">Medicines</h3>

            {selectedPrescription.medicines.map((m: any, i: number) => (
  <div key={i} className="grid grid-cols-3 gap-2 mt-2">
    <Input
      disabled={mode === "view"}
      value={m.name}
      onChange={(e) => {
        const meds = [...selectedPrescription.medicines];
        meds[i].name = e.target.value;
        setSelectedPrescription({ ...selectedPrescription, medicines: meds });
      }}
    />
    <Input
      disabled={mode === "view"}
      value={m.dosage}
      onChange={(e) => {
        const meds = [...selectedPrescription.medicines];
        meds[i].dosage = e.target.value;
        setSelectedPrescription({ ...selectedPrescription, medicines: meds });
      }}
    />
    <Input
      disabled={mode === "view"}
      value={m.duration}
      onChange={(e) => {
        const meds = [...selectedPrescription.medicines];
        meds[i].duration = e.target.value;
        setSelectedPrescription({ ...selectedPrescription, medicines: meds });
      }}
    />
  </div>
))}


            {mode === "edit" && (
              <Button className="mt-4 w-full" onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </div>
        </div>
      )}
    </DoctorLayout>
  );
};

export default DoctorReports;
