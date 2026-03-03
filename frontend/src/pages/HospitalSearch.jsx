import React, { useState } from "react";

function HospitalSearch() {
  const [city, setCity] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchHospitals = async () => {
    if (!city.trim()) {
      alert("Enter city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:5000/api/hospitals/${city}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch hospitals");
      }

      const data = await res.json();
      setHospitals(data);
    } catch (err) {
      setError("Something went wrong while fetching hospitals");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">
        🏥 Find Hospitals Near You
      </h2>

      {/* Search Section */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter city (e.g. Bhopal)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={searchHospitals}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Results */}
      {loading && <p>Loading hospitals...</p>}

      {!loading && hospitals.length === 0 && city && (
        <p className="text-gray-600">
          No hospitals found for this city.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {hospitals.map((h) => (
          <div
            key={h.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-lg font-bold mb-2">
              🏥 {h.name}
            </h3>

            <p className="text-gray-600 mb-1">
              📍 {h.address || "Address not available"}
            </p>

            <p className="text-gray-600">
              📞 {h.phone || "Not Available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HospitalSearch;