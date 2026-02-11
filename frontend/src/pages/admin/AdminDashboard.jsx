import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [downloading, setDownloading] = useState({});
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Icons as React components
  const CheckCircle = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  const XCircle = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );

  const Download = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  const Eye = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const FileText = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );

  const UserCheck = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  );

  const Clock = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const ChevronDown = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const ChevronUp = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );

  const Search = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  const Filter = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );

  const History = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const RotateCcw = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5001/api/admin/doctors/pending",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      
      const allDoctors = data.map(doc => ({
        ...doc,
        status: doc.status || "pending"
      }));
      
      setDoctors(allDoctors);
      
      const pendingCount = allDoctors.filter(d => d.status === "pending").length;
      const approvedCount = allDoctors.filter(d => d.status === "approved").length;
      const rejectedCount = allDoctors.filter(d => d.status === "rejected").length;
      
      setStats({ 
        pending: pendingCount, 
        approved: approvedCount, 
        rejected: rejectedCount 
      });
      
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch doctors");
      
      const mockDoctors = [
        {
          _id: "1",
          name: "Dr. John Smith",
          email: "john.smith@example.com",
          medicalRegNumber: "MD123456",
          licenseCertificateUrl: "/uploads/license1.pdf",
          idProofUrl: "/uploads/id1.pdf",
          specialization: "Cardiology",
          phone: "+1 (555) 123-4567",
          hospital: "City General Hospital",
          experience: "10 years",
          qualifications: "MBBS, MD Cardiology",
          createdAt: new Date().toISOString(),
          status: "pending"
        },
        {
          _id: "2",
          name: "Dr. Sarah Johnson",
          email: "sarah.j@example.com",
          medicalRegNumber: "MD789012",
          licenseCertificateUrl: "/uploads/license2.pdf",
          idProofUrl: "/uploads/id2.pdf",
          specialization: "Pediatrics",
          phone: "+1 (555) 987-6543",
          hospital: "Children's Medical Center",
          experience: "8 years",
          qualifications: "MBBS, DCH",
          createdAt: new Date().toISOString(),
          status: "approved"
        },
        {
          _id: "3",
          name: "Dr. Michael Brown",
          email: "michael.b@example.com",
          medicalRegNumber: "MD345678",
          licenseCertificateUrl: "/uploads/license3.pdf",
          idProofUrl: "/uploads/id3.pdf",
          specialization: "Neurology",
          phone: "+1 (555) 456-7890",
          hospital: "Neuro Care Institute",
          experience: "15 years",
          qualifications: "MBBS, DM Neurology",
          createdAt: new Date().toISOString(),
          status: "rejected"
        }
      ];
      
      setDoctors(mockDoctors);
      setStats({ pending: 1, approved: 1, rejected: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5001/api/admin/doctor/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      
      if (status === "approved") {
        toast.success("Doctor approved successfully!", {
          icon: "✅",
          duration: 3000,
        });
      } else if (status === "rejected") {
        toast.error("Doctor application rejected", {
          icon: "❌",
          duration: 3000,
        });
      }
      
      setDoctors(prevDoctors =>
        prevDoctors.map(doctor =>
          doctor._id === id ? { ...doctor, status } : doctor
        )
      );
      
      setStats(prevStats => {
        const newStats = { ...prevStats };
        const oldDoctor = doctors.find(d => d._id === id);
        if (oldDoctor?.status === "pending") newStats.pending--;
        if (oldDoctor?.status === "approved") newStats.approved--;
        if (oldDoctor?.status === "rejected") newStats.rejected--;
        
        if (status === "pending") newStats.pending++;
        if (status === "approved") newStats.approved++;
        if (status === "rejected") newStats.rejected++;
        
        return newStats;
      });
      
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update status");
      
      setDoctors(prevDoctors =>
        prevDoctors.map(doctor =>
          doctor._id === id ? { ...doctor, status } : doctor
        )
      );
    }
  };

  const handleDownload = async (url, filename, doctorId) => {
    try {
      setDownloading((prev) => ({ ...prev, [doctorId]: true }));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const link = document.createElement('a');
      const downloadUrl = url.startsWith('http') 
        ? url 
        : `http://localhost:5001${url.startsWith('/') ? url : '/' + url}`;
      
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Document downloaded successfully", {
        icon: "📄",
        duration: 2000,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download document");
    } finally {
      setDownloading((prev) => ({ ...prev, [doctorId]: false }));
    }
  };

  const toggleExpand = (doctorId) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    if (statusFilter !== "all" && doctor.status !== statusFilter) {
      return false;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return (
      doctor.name?.toLowerCase().includes(searchLower) ||
      doctor.email?.toLowerCase().includes(searchLower) ||
      doctor.medicalRegNumber?.toLowerCase().includes(searchLower) ||
      doctor.specialization?.toLowerCase().includes(searchLower)
    );
  });

  const statusBadge = {
    pending: { 
      color: "bg-yellow-50 border border-yellow-200 text-yellow-800", 
      icon: Clock,
      textColor: "text-yellow-600"
    },
    approved: { 
      color: "bg-green-50 border border-green-200 text-green-800", 
      icon: CheckCircle,
      textColor: "text-green-600"
    },
    rejected: { 
      color: "bg-red-50 border border-red-200 text-red-800", 
      icon: XCircle,
      textColor: "text-red-600"
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
        
        .slide-down {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scaleIn 0.3s ease forwards;
        }
        
        .gradient-accept {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }
        
        .gradient-accept:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }
        
        .gradient-reject {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }
        
        .gradient-reject:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
        
        .gradient-approved {
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
        }
        
        .gradient-rejected {
          background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage doctor registrations and approvals
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 text-blue-600">
                <UserCheck size={40} />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Approvals</p>
                  <p className="text-3xl font-bold mt-2 text-yellow-600">{stats.pending}</p>
                </div>
                <div className="w-10 h-10 text-yellow-500">
                  <Clock size={40} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Approved Doctors</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">{stats.approved}</p>
                </div>
                <div className="w-10 h-10 text-green-500">
                  <CheckCircle size={40} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Rejected Applications</p>
                  <p className="text-3xl font-bold mt-2 text-red-600">{stats.rejected}</p>
                </div>
                <div className="w-10 h-10 text-red-500">
                  <XCircle size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, specialization, or registration number..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg">
                <div className="text-gray-400">
                  <Filter size={20} />
                </div>
                <select
                  className="bg-transparent focus:outline-none cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <div>
                <FileText size={24} />
              </div>
              Doctor Applications ({filteredDoctors.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-500">Loading applications...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                <UserCheck size={96} />
              </div>
              <p className="text-gray-500 text-lg">No doctors found</p>
              <p className="text-gray-400 mt-2">
                {searchTerm ? "Try adjusting your search" : "No applications available"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredDoctors.map((doctor, index) => {
                const StatusIcon = statusBadge[doctor.status]?.icon || Clock;
                const statusColor = statusBadge[doctor.status]?.color || "bg-yellow-50 border border-yellow-200 text-yellow-800";
                const textColor = statusBadge[doctor.status]?.textColor || "text-yellow-600";
                
                return (
                  <div
                    key={doctor._id}
                    className="p-6 hover:bg-gray-50 transition-all duration-300 group"
                    style={{
                      animation: `fadeInUp 0.5s ease ${index * 0.05}s both`
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Doctor Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                              {doctor.name?.charAt(0) || "D"}
                            </div>
                            {doctor.status !== "pending" && (
                              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${doctor.status === "approved" ? "gradient-approved" : "gradient-rejected"} border-2 border-white flex items-center justify-center animate-scale-in`}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">
                                {doctor.name || "Unknown Doctor"}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusColor} ${textColor} animate-scale-in`}>
                                <div className="flex items-center">
                                  <StatusIcon size={12} />
                                </div>
                                {doctor.status ? doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1) : "Pending"}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{doctor.email || "No email provided"}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500">Registration Number</p>
                            <p className="font-medium text-gray-900">{doctor.medicalRegNumber || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Specialization</p>
                            <p className="font-medium text-gray-900">{doctor.specialization || "Not specified"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Applied On</p>
                            <p className="font-medium text-gray-900">
                              {doctor.createdAt ? new Date(doctor.createdAt).toLocaleDateString() : "Unknown"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons - PROPERLY ALIGNED */}
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        {doctor.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStatusUpdate(doctor._id, "approved")}
                              className="px-4 py-2.5 gradient-accept text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:translate-y-[-1px] active:scale-95 flex items-center gap-2 min-w-[100px] justify-center"
                            >
                              <CheckCircle size={18} />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(doctor._id, "rejected")}
                              className="px-4 py-2.5 gradient-reject text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:translate-y-[-1px] active:scale-95 flex items-center gap-2 min-w-[100px] justify-center"
                            >
                              <XCircle size={18} />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className={`px-4 py-2.5 rounded-lg font-medium ${doctor.status === "approved" ? "gradient-approved" : "gradient-rejected"} text-white flex items-center gap-2`}>
                              <div className="flex items-center">
                                {doctor.status === "approved" ? <CheckCircle size={18} /> : <XCircle size={18} />}
                              </div>
                              <span>{doctor.status === "approved" ? "Approved" : "Rejected"}</span>
                            </div>
                            <button
                              onClick={() => handleStatusUpdate(doctor._id, "pending")}
                              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 hover:translate-y-[-1px] active:scale-95 flex items-center gap-2 text-sm"
                              title="Change Status"
                            >
                              <RotateCcw size={16} />
                              <span className="hidden sm:inline">Change</span>
                            </button>
                          </div>
                        )}
                        
                        {/* Details Button */}
                        <button
                          onClick={() => toggleExpand(doctor._id)}
                          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 hover:translate-y-[-1px] active:scale-95 flex items-center gap-2"
                        >
                          {expandedDoctor === doctor._id ? (
                            <>
                              <ChevronUp size={18} />
                              <span>Less Details</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown size={18} />
                              <span>More Details</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedDoctor === doctor._id && (
                      <div className="mt-6 pt-6 border-t border-gray-100 slide-down">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Documents Section */}
                          <div>
                            <h4 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                              <div>
                                <FileText size={20} />
                              </div>
                              Documents
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                <div>
                                  <p className="font-medium">Medical License</p>
                                  <p className="text-sm text-gray-500">License Certificate</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      const url = doctor.licenseCertificateUrl?.startsWith('http') 
                                        ? doctor.licenseCertificateUrl 
                                        : `http://localhost:5001${doctor.licenseCertificateUrl?.startsWith('/') ? doctor.licenseCertificateUrl : '/' + doctor.licenseCertificateUrl}`;
                                      window.open(url, '_blank');
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:translate-y-[-1px] active:scale-95 flex items-center"
                                    title="Preview"
                                  >
                                    <Eye size={20} />
                                  </button>
                                  <button
                                    onClick={() => handleDownload(
                                      doctor.licenseCertificateUrl, 
                                      `license_${doctor.medicalRegNumber || doctor._id}.pdf`, 
                                      doctor._id
                                    )}
                                    disabled={downloading[doctor._id]}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 hover:translate-y-[-1px] active:scale-95 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Download"
                                  >
                                    {downloading[doctor._id] ? (
                                      <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin-slow"></div>
                                    ) : (
                                      <Download size={20} />
                                    )}
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                <div>
                                  <p className="font-medium">ID Proof</p>
                                  <p className="text-sm text-gray-500">Government Issued ID</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      const url = doctor.idProofUrl?.startsWith('http') 
                                        ? doctor.idProofUrl 
                                        : `http://localhost:5001${doctor.idProofUrl?.startsWith('/') ? doctor.idProofUrl : '/' + doctor.idProofUrl}`;
                                      window.open(url, '_blank');
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:translate-y-[-1px] active:scale-95 flex items-center"
                                    title="Preview"
                                  >
                                    <Eye size={20} />
                                  </button>
                                  <button
                                    onClick={() => handleDownload(
                                      doctor.idProofUrl, 
                                      `id_proof_${doctor.medicalRegNumber || doctor._id}.pdf`, 
                                      doctor._id
                                    )}
                                    disabled={downloading[doctor._id]}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 hover:translate-y-[-1px] active:scale-95 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Download"
                                  >
                                    {downloading[doctor._id] ? (
                                      <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin-slow"></div>
                                    ) : (
                                      <Download size={20} />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Additional Information */}
                          <div>
                            <div className="mb-4 flex items-center justify-between">
                              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                                <History size={20} />
                                Additional Information
                              </h4>
                              <span className="text-xs text-gray-500">
                                ID: {doctor._id.slice(-6)}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Phone Number</span>
                                <span className="font-medium">{doctor.phone || "Not provided"}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Hospital/Clinic</span>
                                <span className="font-medium">{doctor.hospital || "Not provided"}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-600">Experience</span>
                                <span className="font-medium">{doctor.experience || "Not specified"}</span>
                              </div>
                              {doctor.qualifications && (
                                <div className="flex justify-between py-2">
                                  <span className="text-gray-600">Qualifications</span>
                                  <span className="font-medium text-right max-w-xs">{doctor.qualifications}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Status History */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusColor} flex items-center gap-1.5`}>
                                    <div className="flex items-center">
                                      <StatusIcon size={12} />
                                    </div>
                                    <span>Current: {doctor.status || "pending"}</span>
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date().toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 text-center text-gray-500 text-sm animate-fade-in">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Pending: {stats.pending}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Approved: {stats.approved}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Rejected: {stats.rejected}</span>
            </div>
          </div>
          <p className="mt-2">Showing {filteredDoctors.length} of {doctors.length} total applications</p>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;