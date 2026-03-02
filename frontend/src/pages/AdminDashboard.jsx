import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";



const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [analytics, setAnalytics] = useState([]);


const fetchDashboard = async () => {
  const patientsRes = await axios.get("http://localhost:5000/api/patients");
  const appointRes = await axios.get("http://localhost:5000/api/appointments");
  const doctorRes = await axios.get("http://localhost:5000/api/doctors");

  setStats({
    total_patients: patientsRes.data.length,
    waiting: 0,
    in_consultation: 0,
    emergency: patientsRes.data.filter(p => p.severity === "High").length
  });

  setAppointments(appointRes.data);
  setDoctors(doctorRes.data);

  setAnalytics([
    { date: "Today", count: appointRes.data.length }
  ]);
};


const updateStatus = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.put(
      `http://localhost:5000/api/appointments/${id}`,
      { status: "Completed" },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchDashboard(); // refresh dashboard after update
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
  }
};



  useEffect(() => {
    fetchDashboard();

    
  }, []);




  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Patients" value={stats.total_patients} />
        <StatCard title="Waiting" value={stats.waiting} />
        <StatCard title="In Consultation" value={stats.in_consultation} />
        <StatCard title="Emergency" value={stats.emergency} />
      </div>

      {/* Appointment Console */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Appointment Management</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Patient</th>
              <th>Doctor</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b">
                <td>{a.patient_name}</td>
                <td>{a.doctor_name}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-white ${
                    a.priority === "High"
                      ? "bg-red-500"
                      : a.priority === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}>
                    {a.priority}
                  </span>
                </td>
                <td>{a.status}</td>
                <td>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => updateStatus(a.id)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Doctor Overview */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Doctors by Department</h2>
          {doctors.map((d, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{d.department}</span>
              <span>{d.count}</span>
            </div>
          ))}
        </div>

        {/* Analytics */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Daily Appointments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-3xl font-bold">{value || 0}</p>
  </div>
);

export default AdminDashboard;