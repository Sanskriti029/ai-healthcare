import React, { useEffect, useState } from "react";
import api from "/src/api";
import { useRef } from "react";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [queue, setQueue] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
const notifiedRef = useRef(false);
  const userId = localStorage.getItem("user_id"); // 🔥 Replace with JWT later

  // 📅 Fetch My Appointments
  const fetchAppointments = async () => {
    try {
      const res = await api.get(
        `http://localhost:5000/api/user/appointments/${userId}`
      );
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };
useEffect(() => {
  if (currentPatient?.isMe && !notifiedRef.current) {
    notifiedRef.current = true;

    // 🔔 Alert popup
    alert("🩺 It's your turn!");

    // 🔊 Optional sound
    // const audio = new Audio(
    //   "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    // );
    // audio.play();

    // 🌐 Browser notification (optional)
    // if (Notification.permission === "granted") {
    //   new Notification("Doctor is ready", {
    //     body: "It's your turn now!",
    //   });
    // }
  }
}, [currentPatient]);
  // 🔁 Fetch Queue (Polling)
  const fetchQueue = async () => {
    try {
      setRefreshing(true);
      const res = await api.get("http://localhost:5000/api/queue");

      setQueue(res.data.waiting || []);
      setCurrentPatient(res.data.consultation?.[0] || null);

      setRefreshing(false);
    } catch (err) {
      console.error("Error fetching queue:", err);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchQueue();

    // 🔁 Auto refresh every 5 sec
    const interval = setInterval(() => {
      fetchQueue();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
useEffect(() => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}, []);
  // 🎨 Status Colors
  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-yellow-500";
    if (status === "In Consultation") return "bg-blue-500";
    return "bg-green-600";
  };

  // 📊 Queue Position
  const getMyPosition = () => {
    const index = queue.findIndex((q) => q.isMe);
    return index >= 0 ? index + 1 : null;
  };

  const myPosition = getMyPosition();
  const peopleAhead = myPosition ? myPosition - 1 : 0;
  const estimatedTime = peopleAhead * 5; // 5 min per patient

  return (
    <div className="p-6 bg-gray-100 min-h-screen  text-gray-800">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      {/* 📅 My Appointments */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-4">My Appointments</h2>

        {appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b">
                  <td>{a.doctor_name}</td>
                  <td>{a.department}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-white ${getStatusColor(
                        a.status
                      )}`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🔔 Live Status */}
      <div className="bg-green-100 p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          Live Status
          {refreshing && (
            <span className="text-sm text-gray-600 animate-pulse">
              updating...
            </span>
          )}
        </h2>

        {currentPatient ? (
          <div>
            <p className="text-lg font-semibold">
              Now Serving: {currentPatient.patient}
            </p>

            {currentPatient.isMe && (
              <p className="text-green-700 font-bold">
                🩺 It's your turn!
              </p>
            )}
          </div>
        ) : (
          <p>No active consultation</p>
        )}
      </div>

      {/* ⏳ Queue Tracking */}
      <div className="bg-green-100 text-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Queue Status</h2>

        <p>People ahead: {peopleAhead}</p>
        {/* <p>Estimated time: {estimatedTime} mins</p> */}

        <div className="mt-4">
          {queue.length === 0 ? (
            <p>No one in queue</p>
          ) : (
            queue.map((q, index) => (
              <div
                key={q.id}
                className={` text-gray-800 flex justify-between p-2  ${
                  q.isMe ? "  text-gray-800 font-semibold rounded " : ""
                }`}
              >
                <span>
                  {index + 1}. {q.patient}
                </span>
                {q.isMe && <span>(You)</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
