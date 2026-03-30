import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

function Appointment() {
  const [patientName, setPatientName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState({});
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const location = useLocation();
  const aiData = location.state?.aiResult;
  const symptomsFromAI = location.state?.symptoms;
const navigate = useNavigate();
  const selectedDoctor = doctors.find(
    (doc) => String(doc.id) === String(doctorId),
  );

  
  // ✅ get value safely
  const suggestedDepartment = location.state?.suggestedDepartment || "";
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Failed to load doctors", err));
  }, []);
  useEffect(() => {
    if (!doctorId) return;

    fetch(`http://localhost:5000/api/doctors/${doctorId}/availability`)
      .then((res) => res.json())
      .then((data) => setAvailability(data));
  }, [doctorId]);

  useEffect(() => {
  if (!aiData) return;

  console.log("AI DATA RECEIVED:", aiData);

  // Set department
  if (aiData.suggestedDepartment) {
    setDepartment(aiData.suggestedDepartment);
  }

  // ✅ Direct mapping
  if (aiData.severity) {
    const map = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
  Emergency: "High", // or "Emergency" if you want special handling
};

    setPriority(map[aiData.severity] || "");
  }
}, [aiData]);

useEffect(() => {
  console.log("AI DATA:", aiData);
}, [aiData]);
  useEffect(() => {
    if (department && doctors.length > 0) {
      findBestDoctor(department);
    }
  }, [department, doctors]);

  const filteredDoctors = doctors.filter((d) =>
    (d.department || "")
      .toLowerCase()
      .includes(suggestedDepartment.toLowerCase()),
  );

  const findBestDoctor = async (dept) => {
    const filtered = doctors.filter((d) =>
      d.department.toLowerCase().includes(dept.toLowerCase()),
    );

    if (filtered.length === 0) return;

    let bestDoctor = null;
    let maxFree = -1;

    for (let doc of filtered) {
      const res = await fetch(
        `http://localhost:5000/api/doctors/${doc.id}/availability`,
      );
      const data = await res.json();

      let freeCount = 0;

      Object.values(data)
        .slice(0, 5)
        .forEach((day) => {
          Object.values(day).forEach((slot) => {
            if (slot === "free") freeCount++;
          });
        });

      if (freeCount > maxFree) {
        maxFree = freeCount;
        bestDoctor = doc;
      }
    }

    if (bestDoctor) {
      setDoctorId(bestDoctor.id);
    }
  };

 const handleSubmit = async () => {
  if (!date || !timeSlot) {
    alert("Please select date and time");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/appointments",
      {
        patient_name: patientName,
        doctor_id: doctorId,
        date,
        time_slot: timeSlot,
        priority,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Appointment Confirmed ✅");

    // refresh availability
    const updated = await fetch(
      `http://localhost:5000/api/doctors/${doctorId}/availability`
    );
    setAvailability(await updated.json());

    setTimeSlot("");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.error || "Something went wrong ❌");
  }
};

  const isPast = (d) => new Date(d) < new Date().setHours(0, 0, 0, 0);
  const getDayColor = (day) => {
    if (isPast(day)) return "bg-gray-200 text-gray-400";

    const slots = availability[day];

    if (!slots) return "bg-blue-50"; // loading / no data

    const values = Object.values(slots);
    const total = values.length;
    const busy = values.filter((s) => s === "busy").length;

    if (busy === 0) return "bg-green-200"; // 🟢 all free
    if (busy === total) return "bg-red-300"; // 🔴 full
    return "bg-yellow-200"; // 🟡 partial
  };

  //calender generate
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

      cells.push(
        <button
          key={day}
          disabled={isPast(day)}
          onClick={() => setDate(day)}
          className={`aspect-square rounded-xl flex flex-col items-center justify-center transition
          ${getDayColor(day)}
          ${isPast(day) ? "cursor-not-allowed opacity-60" : "hover:scale-105"}
          ${date === day ? "ring-2 ring-blue-600 scale-105 bg-blue-100" : ""}
        `}
        >
          <span className="text-sm font-semibold">{i}</span>
        </button>,
      );
    }

    return cells;
  };

  const renderSlots = () => {
    const defaultSlots = {
      "09:00": "free",
      "10:00": "free",
      "11:00": "free",
      "12:00": "free",
      "14:00": "free",
      "15:00": "free",
      "16:00": "free",
    };

    const slotsData = availability[date] || defaultSlots;

    if (!date) return null;

    return (
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Available Time Slots</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(slotsData).map(([slot, status]) => (
            <button
              key={slot}
              disabled={status === "busy"}
              onClick={() => setTimeSlot(slot)}
              className={`py-3 rounded-lg text-sm font-medium transition
  ${
    status === "busy"
      ? "bg-red-200 text-gray-500 cursor-not-allowed"
      : "bg-green-100 hover:bg-green-200"
  }
  ${timeSlot === slot ? "bg-blue-600 text-white" : ""}
`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const changeMonth = (dir) => {
    const newDate = new Date(currentYear, currentMonth + dir);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center text-gray-800">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-xl font-bold">Book Appointment</h2>
          {aiData && (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">AI Suggested</p>
              <p className="font-semibold">{aiData.suggestedDepartment}</p>
              <p className="text-sm">Severity: {aiData.severity}</p>
            </div>
          )}
          <input
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border p-3 w-full rounded-lg"
          />

          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="border p-3 w-full rounded-lg"
          >
            <option value="">Select Doctor</option>

            {doctors
              .filter((d) =>
                department
                  ? (d.department || d.specialization || "")
                      .toLowerCase()
                      .includes(department.toLowerCase())
                  : true,
              )
              .map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.department || d.specialization})
                </option>
              ))}
          </select>

          {selectedDoctor && (
            <div className="p-4 bg-gray-50 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-blue-600">
                Doctor Details
              </h3>

              <div className="space-y-1 text-sm">
                <p>
                  <strong>Name:</strong> {selectedDoctor.name}
                </p>
                <p>
                  <strong>Department:</strong> {selectedDoctor.department}
                </p>
                <p>
                  <strong>Hospital:</strong> {selectedDoctor.hospital}
                </p>
                <p>
                  <strong>City:</strong> {selectedDoctor.city}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedDoctor.phone}
                </p>
              </div>
             <button
  onClick={() =>
    navigate("/hospitals", {
      state: {
        hospital: {
          name: selectedDoctor.hospital,
          city: selectedDoctor.city,
          phone: selectedDoctor.phone,
          address: selectedDoctor.address,
        },
      },
    })
  }
  className="bg-teal-700 py-2 px-4 text-white rounded hover:bg-teal-800 transition"
>
  See Hospital Details
</button>
            </div>
          )}

         
          <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="border p-2 rounded-md w-full"
>
  <option value="">Select priority --</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>
<p className="text-sm text-gray-500">
  Current Priority: {priority || "None"}
</p>

          {date && timeSlot && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-500">Selected</p>
              <p className="font-semibold">{date}</p>
              <p className="font-semibold">{timeSlot}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>

        {/* RIGHT PANEL - GOOGLE STYLE */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth(-1)}>◀</button>
            <h3 className="font-semibold text-lg">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button onClick={() => changeMonth(1)}>▶</button>
          </div>

          <div className="grid grid-cols-7 w-full text-center text-xs text-gray-500 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 w-full gap-3">
            {generateCalendar()}
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-200 rounded"></div> Free
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-200 rounded"></div> Limited
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-200 rounded"></div> Full
            </div>
          </div>

          {renderSlots()}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
