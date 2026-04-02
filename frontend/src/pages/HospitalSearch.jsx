import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function HospitalSearch() {
  const location = useLocation();
  const hospitalData = location.state?.hospital;

  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    if (!hospitalData?.name) return;

    fetch(`http://localhost:5000/api/hospital/${hospitalData.name}`)
      .then((res) => res.json())
      .then((data) => setHospital(data))
      .catch(() => setHospital(hospitalData));
  }, [hospitalData]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Hospital Details</h2>

      {!hospital && <p>Loading...</p>}

      {hospital && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">🏥 {hospital.name}</h3>

          <p className="text-gray-600 mb-1">
            📍 {hospital.address || "Address not available"}
          </p>

          <p className="text-gray-600 mb-1">🌆 {hospital.city}</p>

          <p className="text-gray-600">📞 {hospital.phone}</p>
          {/* Map */}
          <iframe
            title="map"
            width="100%"
            height="300"
            className="mt-4 rounded-xl"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              hospital.address,
            )}&output=embed`}
          />

          {/* Button */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              hospital.address,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            📍 Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

export default HospitalSearch;
