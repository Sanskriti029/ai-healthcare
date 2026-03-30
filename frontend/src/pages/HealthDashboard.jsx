// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// function HealthcareDashboard() {
//   const location = useLocation();

//   // 🔹 Data coming from previous pages
//   const city = location.state?.city;
//   const hospitalName = location.state?.hospital;

//   const [hospital, setHospital] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [pharmacies, setPharmacies] = useState([]);

//   const [loadingHospital, setLoadingHospital] = useState(false);
//   const [loadingDoctors, setLoadingDoctors] = useState(false);
//   const [loadingPharmacy, setLoadingPharmacy] = useState(false);

//   useEffect(() => {
//     if (!city && !hospitalName) return;

//     // 🏥 Hospital
//     if (hospitalName) {
//       setLoadingHospital(true);
//       fetch(`http://localhost:5000/api/hospital/${hospitalName}`)
//         .then(res => res.json())
//         .then(data => setHospital(data))
//         .catch(() => setHospital(null))
//         .finally(() => setLoadingHospital(false));
//     }

//     // 👨‍⚕️ Doctors
//     if (city) {
//       setLoadingDoctors(true);
//       fetch(`http://localhost:5000/api/doctors/${city}`)
//         .then(res => res.json())
//         .then(data => setDoctors(data))
//         .finally(() => setLoadingDoctors(false));
//     }

//     // 💊 Pharmacies
//     if (city) {
//       setLoadingPharmacy(true);
//       fetch(`http://localhost:5000/api/pharmacies/${city}`)
//         .then(res => res.json())
//         .then(data => setPharmacies(data))
//         .finally(() => setLoadingPharmacy(false));
//     }

//   }, [city, hospitalName]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">

//       <h1 className="text-3xl font-bold mb-8">
//         Healthcare Dashboard
//       </h1>

//       {/* 🏥 Hospital */}
//       {loadingHospital && <p>Loading hospital...</p>}

//       {hospital && (
//         <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg mb-8 text-center">
//           <h2 className="text-xl font-bold mb-2">
//             🏥 {hospital.name}
//           </h2>
//           <p>📍 {hospital.address}</p>
//           <p>📞 {hospital.phone}</p>

//           <iframe
//             title="map"
//             width="100%"
//             height="250"
//             className="mt-4 rounded-lg"
//             src={`https://www.google.com/maps?q=${encodeURIComponent(
//               hospital.address
//             )}&output=embed`}
//           />
//         </div>
//       )}

//       {/* 👨‍⚕️ Doctors */}
//       {loadingDoctors && <p>Loading doctors...</p>}

//       {!loadingDoctors && doctors.length > 0 && (
//         <div className="w-full max-w-3xl mb-8">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Doctors Near You
//           </h2>

//           <div className="grid gap-4">
//             {doctors.map((doc) => (
//               <div key={doc.id} className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="font-semibold">{doc.name}</h3>
//                 <p>{doc.specialization}</p>
//                 <p>{doc.hospital}</p>
//                 <p>{doc.phone}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* 💊 Pharmacies */}
//       {loadingPharmacy && <p>Loading pharmacies...</p>}

//       {!loadingPharmacy && pharmacies.length > 0 && (
//         <div className="w-full max-w-4xl">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Pharmacies Nearby
//           </h2>

//           <div className="grid md:grid-cols-3 gap-6">
//             {pharmacies.map((p) => (
//               <div key={p.id} className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="font-bold">{p.name}</h3>
//                 <p>📍 {p.address}</p>
//                 <p>📞 {p.phone}</p>

//                 <span
//                   className={`px-2 py-1 text-white rounded ${
//                     p.open_24hrs ? "bg-green-500" : "bg-gray-400"
//                   }`}
//                 >
//                   {p.open_24hrs ? "24 Hours" : "Regular"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default HealthcareDashboard;


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
          placeholder="Enter city (Bhopal)"
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

export default HealthcareDashboard;