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
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Find Doctors Near You</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city (e.g. Bhopal)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={searchDoctors}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading doctors...</p>}

      {!loading && doctors.length === 0 && city && (
        <p className="text-gray-600">No doctors found for this city.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {doctors.map((doc) => (
    <div
      key={doc.id}
      className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
    >
      <h3 className="text-lg font-semibold mb-2">{doc.name}</h3>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-800">Specialization:</span>{" "}
        {doc.specialization}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-800">Hospital:</span>{" "}
        {doc.hospital}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium text-gray-800">Phone:</span>{" "}
        {doc.phone}
      </p>
    </div>
  ))}
</div>
    </div>
  );
}

export default DoctorSearch;
