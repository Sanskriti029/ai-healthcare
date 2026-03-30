import React, { useState } from "react";

function PharmacySearch() {
  const [city, setCity] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPharmacies = async () => {
    if (!city) return alert("Enter city name");

    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/api/pharmacies/${city}`
    );
    const data = await res.json();

    setPharmacies(data);
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
      <h2 className="text-3xl font-bold mb-6">
        Find Pharmacies Near You
      </h2> 

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter area (Bhopal)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 rounded-lg w-64"
        />
        <button
          onClick={searchPharmacies}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* {loading && <p>Loading...</p>}
        {!loading && pharmacies.length === 0 && city && (
        <p className="text-gray-600">
          No pharmacies found for this city.
        </p>
      )} */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {pharmacies.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-lg font-bold mb-2">
              {p.name}
            </h3>

            <p className="text-gray-600 mb-1">
              📍 {p.address}
            </p>

            <p className="text-gray-600 mb-2">
              📞 {p.phone || "Not Available"}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-white text-sm ${
                p.open_24hrs
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            >
              {p.open_24hrs
                ? "Open 24 Hours"
                : "Regular Hours"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PharmacySearch;