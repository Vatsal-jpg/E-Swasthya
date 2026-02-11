import { useEffect, useState } from "react";
import axios from "axios";
import PatientLayout from "@/components/layouts/PatientLayout";

const PatientReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // patient login token
    if (!token) return;

    axios
      .get("http://localhost:5001/api/patient/prescriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setReports(res.data))
      .catch((err) => console.log("Auth error:", err.response?.status));
  }, []);

  return (
    <PatientLayout>
      <h1 className="text-2xl font-bold mb-6">My Medical Reports</h1>

      <div className="space-y-4">
        {reports.map((r: any) => (
          <div key={r._id} className="border rounded-xl p-4 bg-white shadow">
            
            {/* Heading = Disease Name */}
            <h2 className="text-lg font-semibold text-blue-600">
              {r.diagnosis}
            </h2>

            <p className="text-sm text-gray-500">
              Doctor: {r.doctor?.name || "Doctor"} •{" "}
              {new Date(r.createdAt).toDateString()}
            </p>

            <div className="mt-3">
              <h3 className="font-medium">Medicines:</h3>
              <ul className="list-disc ml-5">
                {r.medicines.map((m: any, i: number) => (
                  <li key={i}>
                    {m.name} — {m.dosage} — {m.duration}
                  </li>
                ))}
              </ul>
            </div>

            {r.advice && (
              <div className="mt-2">
                <h3 className="font-medium">Advice:</h3>
                <p className="text-sm">{r.advice}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </PatientLayout>
  );
};

export default PatientReports;
