import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing & Auth
import LandingPage from "./pages/LandingPage";
import PatientLogin from "./pages/patient/PatientLogin";
import PatientSignup from "./pages/patient/PatientSignup";
import DoctorLogin from "./pages/doctor/DoctorLogin";
import DoctorSignup from "./pages/doctor/DoctorSignup";
import DoctorPendingApproval from "./pages/doctor/DoctorPendingApproval";

// Patient Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import AIPrediction from "./pages/patient/AIPrediction";
import Reports from "./pages/patient/Reports";
import VideoCall from "./pages/patient/VideoCall";
import NearbyClinics from "./pages/patient/NearbyClinics";
//import HealthPassport from "./pages/patient/HealthPassport";
import FollowUps from "./pages/patient/FollowUps";
import MedicineReminder from "./pages/patient/MedicineReminder";
import HealthLibrary from "./pages/patient/HealthLibrary";
import Support from "./pages/patient/Support";
import PatientProfile from "./pages/patient/PatientProfile";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorCalendar from "./pages/doctor/DoctorCalendar";
import DoctorVideoCall from "./pages/doctor/DoctorVideoCall";
import PatientHistory from "./pages/doctor/PatientHistory";
import DoctorReports from "./pages/doctor/DoctorReports";
import DoctorFollowUps from "./pages/doctor/DoctorFollowUps";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorQRScanner from "./pages/doctor/DoctorQRScanner.tsx"; // NEW

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Test Page
import TestVideoCall from "./pages/TestVideoCall"; // ADD THIS IMPORT

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Patient Auth */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/signup" element={<PatientSignup />} />

          {/* Doctor Auth */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/signup" element={<DoctorSignup />} />
          <Route path="/doctor/pending" element={<DoctorPendingApproval />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Patient Portal */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/ai-prediction" element={<AIPrediction />} />
          <Route path="/patient/reports" element={<Reports />} />
          <Route path="/patient/video-call/:id" element={<VideoCall />} />
          <Route path="/patient/nearby-clinics" element={<NearbyClinics />} />
          {/* <Route path="/patient/health-passport" element={<HealthPassport />} /> */}
          <Route path="/patient/follow-ups" element={<FollowUps />} />
          <Route path="/patient/medicine-reminder" element={<MedicineReminder />} />
          <Route path="/patient/health-library" element={<HealthLibrary />} />
          <Route path="/patient/support" element={<Support />} />
          <Route path="/patient/profile" element={<PatientProfile />} />

          {/* Doctor Portal */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/calendar" element={<DoctorCalendar />} />
          <Route path="/doctor/video-call/:id" element={<DoctorVideoCall />} />
          <Route path="/doctor/patient/:id/history" element={<PatientHistory />} />
          <Route path="/doctor/reports" element={<DoctorReports />} />
          <Route path="/doctor/follow-ups" element={<DoctorFollowUps />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/scan-patient" element={<DoctorQRScanner />} />
          {/* Test Route */}
          <Route path="/test-video" element={<TestVideoCall />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;