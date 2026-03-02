import React, { useState } from "react";

function Appointment() {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        patient_name: patientName,
        doctor_name: doctorName,
        department: department,
        priority: priority,
        date: date,
      }),
    });

    const data = await res.json();
    alert(data.message || "Appointment booked!");

    setPatientName("");
    setDoctorName("");
    setDepartment("");
    setPriority("Medium");
    setDate("");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#f4f7f9]">
      <div className="bg-white p-8 w-[350px] rounded-xl shadow-lg flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Book Appointment
        </h2>

        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="border p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded-md"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-md"
        />

        <button
          onClick={handleSubmit}
          className="bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Appointment;