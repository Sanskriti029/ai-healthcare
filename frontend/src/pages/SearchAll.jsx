import React, { useState } from "react";

function SearchAll() {
  const [city, setCity] = useState("");
  const [type, setType] = useState("doctors");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchData = async () => {
    if (!city) return alert("Enter city name");

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(`http://localhost:5000/api/${type}/${city}`);
      const data = await res.json();
      setResults(data);
      console.log(data);
    } catch (err) {
      console.error(err);

      alert("Error fetching data");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Search Healthcare Services</h2>

      {/* Search Controls */}
      <div className="flex flex-wrap gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter city (e.g. Bhopal)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 rounded-lg w-64"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="doctors">Doctors</option>
          <option value="pharmacies">Pharmacies</option>
          <option value="hospitals">Hospitals</option>
        </select>

        <button
          onClick={searchData}
          disabled={loading}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Messages */}
      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && city && (
        <p className="text-gray-600">No results found.</p>
      )}

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-6">
        {results.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            {/* DOCTORS */}
            {type === "doctors" && (
              <>
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p>🩺 {item.specialization}</p>
                <p>🏥 {item.hospital}</p>
                <p>📞 {item.phone}</p>
              </>
            )}

            {/* PHARMACIES */}
            {type === "pharmacies" && (
              <>
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p>📍 {item.address}</p>
                <p>📞 {item.phone || "Not Available"}</p>
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    item.open_24hrs ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {item.open_24hrs ? "Open 24 Hours" : "Regular Hours"}
                </span>
               <p> <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    item.address,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg"
                >
                  📍 Open in Google Maps
                </a></p>
              </>
            )}

            {/* HOSPITALS */}
            {type === "hospitals" && (
              <>
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p>📍 {item.address}</p>
                <p>📞 {item.phone || "Not Available"}</p>
                {/* <p>🏥 {item.type || "General Hospital"}</p> */}

                {/* Button */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    item.address,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg"
                >
                  📍 Open in Google Maps
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchAll;
