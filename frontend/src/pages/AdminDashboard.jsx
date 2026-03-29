import React, { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { io } from "socket.io-client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  const [waitingQueue, setWaitingQueue] = useState([]);
  const [consultationQueue, setConsultationQueue] = useState([]);
  const [prioritySort, setPrioritySort] = useState("asc");

  const fetchQueue = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/queue");

      setWaitingQueue(res.data.waiting);
      setConsultationQueue(res.data.consultation);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const patientsRes = await axios.get(
        "http://localhost:5000/api/patients",
        config,
      );

      const appointRes = await axios.get(
        "http://localhost:5000/api/appointments",
        config,
      );

      setStats({
        total_patients: patientsRes.data.length,
        emergency: patientsRes.data.filter((p) => p.severity === "Emergency")
          .length,

        // 🆕 Queue stats
        waiting: appointRes.data.filter((a) => a.status === "Pending").length,
        in_consultation: appointRes.data.filter(
          (a) => a.status === "In Consultation",
        ).length,
        
      });

      // ✅ Department-wise appointment count
      const deptCount = {};

      appointRes.data.forEach((a) => {
        if (deptCount[a.department]) {
          deptCount[a.department]++;
        } else {
          deptCount[a.department] = 1;
        }
      });

      const deptData = Object.keys(deptCount).map((dept) => ({
        department: dept,
        count: deptCount[dept],
      }));

      setDepartmentStats(deptData);
      setAppointments(appointRes.data);

      // ✅ Analytics (daily)
      setAnalytics([{ date: "Today", count: appointRes.data.length }]);
    } catch (error) {
      console.error("Dashboard Error:", error.response?.data || error.message);
    }
  };

  const updateStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("token");

    let newStatus = "";

    if (currentStatus === "Pending") {
      newStatus = "In Consultation";
    } else if (currentStatus === "In Consultation") {
      newStatus = "Completed";
    }

    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchDashboard();
    } catch (error) {
      console.error(error);
      
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?",
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setAppointments((prev) => prev.filter((app) => app.id !== id));

        fetchDashboard(); // refresh counts also
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  // sorting based on priority
  const sortedAppointments = [...appointments].sort((a, b) => {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    return prioritySort === "asc"
      ? priorityOrder[a.priority] - priorityOrder[b.priority]
      : priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    fetchQueue();

    const interval = setInterval(() => {
      fetchQueue();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
const priorityColors = {
  Emergency: "bg-red-700 text-white",
  High: "bg-red-500 text-white",
  Medium: "bg-yellow-400 text-black",  // 👈 FIX HERE
  Low: "bg-green-500 text-white",
};
  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Patients" value={stats.total_patients} />
        <StatCard title="Emergency" value={stats.emergency} />
        <StatCard title="Waiting" value={stats.waiting} />
        <StatCard title="In Consultation" value={stats.in_consultation} />
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* 🩺 In Consultation */}
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">In Consultation</h2>

          {consultationQueue.length === 0 ? (
            <p className="text-gray-500">No patients in consultation</p>
          ) : (
            consultationQueue.map((c) => (
              <div key={c.id} className="border-b py-2">
                <p className="font-bold text-lg">{c.patient}</p>
                <p className="text-sm text-gray-600">{c.department}</p>

                <h1 className="text-3xl font-bold">
                  Now Serving: {consultationQueue[0]?.patient || "None"}
                </h1>
              </div>
            ))
          )}
        </div>

        {/* 🪑 Waiting Queue */}
        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Waiting Queue</h2>

          {waitingQueue.length === 0 ? (
            <p className="text-gray-500">No patients waiting</p>
          ) : (
            waitingQueue.map((w, index) => (
              <div key={w.id} className="flex justify-between border-b py-2">
                <span className="font-medium">
                  {index + 1}. {w.patient}
                </span>
                <span className="text-sm text-gray-600">{w.department}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Appointment Management</h2>

        <button
          onClick={() =>
            setPrioritySort(prioritySort === "asc" ? "desc" : "asc")
          }
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Sort by Priority
          <FontAwesomeIcon
            icon={prioritySort === "asc" ? faArrowUp : faArrowDown}
          />
        </button>
      </div>

      {/* Appointment Table */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Appointment Management</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Patient</th>
              <th>Doctor</th>
              <th
                onClick={() =>
                  setPrioritySort(prioritySort === "asc" ? "desc" : "asc")
                }
                className="cursor-pointer "
              >
                Priority
              </th>
              <th>Department</th>
              <th>Status</th>

              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {sortedAppointments.map((a) => (
              <tr key={a.id} className="border-b">
                <td>{a.patient_name}</td>
                <td>{a.doctor_name}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      a.priority === "High"
                        ? "bg-red-500"
                        : a.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  >
                    {a.priority}
                  </span>
                </td>

                <td>{a.department}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      a.status === "Pending"
                        ? "bg-yellow-500"
                        : a.status === "In Consultation"
                          ? "bg-blue-500"
                          : "bg-green-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td>
                  {a.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(a.id, a.status)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600"
                    >
                      Start
                    </button>
                  )}

                  {a.status === "In Consultation" && (
                    <button
                      onClick={() => updateStatus(a.id, a.status)}
                      className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700"
                    >
                      Complete
                    </button>
                  )}

                  {a.status === "Completed" && (
                    <span className="text-gray-500 font-semibold">Done</span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => deleteAppointment(a.id)}
                    className="ml-3 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Department Stats */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Appointments by Department</h2>

          {departmentStats.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            departmentStats.map((d, index) => (
              <div key={index} className="flex justify-between border-b py-2">
                <span>{d.department}</span>
                <span className="font-bold">{d.count}</span>
              </div>
            ))
          )}
        </div>

        {/* Analytics Chart */}
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
