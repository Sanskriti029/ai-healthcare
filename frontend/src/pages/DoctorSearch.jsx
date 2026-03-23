import React, { useState } from "react";

function DoctorSearch() {
  const [city, setCity] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchDoctors = async () => {
    if (!city) return alert("Enter city name");
    setLoading(true);

    const res = await fetch(`http://localhost:5000/api/doctors/${city}`);
    const data = await res.json();
    setDoctors(data);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Find Doctors Near You</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city (e.g. Bhopal)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          onClick={searchDoctors}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading doctors...</p>}

      {!loading && doctors.length === 0 && city && (
        <p className="text-gray-600">No doctors found for this city.</p>
      )}

      <div className="grid gap-4">
        {doctors.map((doc) => (
          <div key={doc.id} className="border p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold">{doc.name}</h3>
            <p>Specialization: {doc.specialization}</p>
            <p>Hospital: {doc.hospital}</p>
            <p>Phone: {doc.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorSearch;
