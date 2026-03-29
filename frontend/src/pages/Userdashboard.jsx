
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = 1; // replace with logged-in user

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/appointments/${userId}`
      );
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-500">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      {/* Appointment List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">My Appointments</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th>Doctor</th>
              <th>Department</th>
              <th>Date</th>
              <th>Time</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b">
                <td>{a.doctor_name}</td>
                <td>{a.department}</td>
                <td>{a.date}</td>
                <td>{a.time_slot}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
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

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;

