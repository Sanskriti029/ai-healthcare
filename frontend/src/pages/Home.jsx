
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      title: "AI-Powered Analysis",
      desc: "Advanced AI analyzes your symptoms in seconds to identify possible conditions.",
      path: "/triage",
    },
    {
      title: "Medicine Suggestions",
      desc: "Get personalized medicine recommendations with dosage information.",
      path: "/triage",
    },
    {
      title: "PDF Report",
      desc: "Download a detailed health analysis report as a PDF for your records.",
      path: "/triage",
    },
    {
      title: "Book Appointment",
      desc: "Schedule doctor visit and share your AI report for informed consultations.",
      path: "/appointment",
    },
    {
      title: "Dashboard",
      desc: "User dashboard to manage your health records and view analytics.",
      path: "/user-dashboard",
    },
    {
      title: "Find Doctors",
      desc: "Search doctors near you and book appointments based on your AI analysis.",
      path: "/search",
    },
    {
      title: "Find Pharmacies",
      desc: "Search pharmacies near you and get directions.",
      path: "/search",
    },
    {
      title: "Find Hospitals",
      desc: "Search hospitals near you and get directions.",
      path: "/search",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      {/* HEADER */}
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-blue-600">
          AI Symptom Analyzer
        </h1>
        <p className="text-gray-600 mt-2">
          Describe your symptoms and get instant AI insights
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 mt-12">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h2>

            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>

            <Link to={item.path}>
              <button className="mt-4 px-4 py-2  bg-gradient-to-r from-teal-900 to-teal-700 text-white rounded-full text-sm hover:scale-105 transition">
                Explore →
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

// const Home = () => {
//   return (
//     <div style={{ minHeight: "100vh", fontFamily: "Arial" }}>

//       {/* HERO SECTION */}
//       <section style={{ padding: "80px 20px", textAlign: "center", background: "#f5f7fa", color:"black" }}>

//         <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
//           Your AI Health
//           <br />
//           <span style={{ color: "#2563eb" }}>
//             Symptom Analyzer
//           </span>
//         </h1>

//         <p style={{ marginTop: "20px", maxWidth: "600px", marginInline: "auto" }}>
//           Describe your symptoms and receive instant AI-powered analysis,
//           possible conditions, medicine suggestions, and a downloadable PDF report.
//         </p>

//         <div style={{ marginTop: "30px" }}>
//           <Link to="/triage">
//             <button
//               style={{
//                 padding: "12px 25px",
//                 fontSize: "16px",
//                 cursor: "pointer",
//                 background : "#008080",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "6px",
//                 transition: "background 0.3s",
//               }}
//             >
//               Start Analysis
//             </button>
//           </Link>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section style={{ padding: "60px 20px", textAlign: "center" }}>
//         <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "40px" }}>
//           How It Works
//         </h2>

//         <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: "12px",
//                 padding: "20px",
//                 width: "280px",
//               }}
//             >
//               <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
//                 {feature.title}
//               </h3>

//               <p style={{ marginTop: "10px", fontSize: "14px" }}>
//                 {feature.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer style={{ borderTop: "1px solid #ddd", padding: "20px", textAlign: "center", fontSize: "14px" }}>
//         <p>AI Healthcare — Powered by AI for educational purposes only.</p>
//         <p style={{ marginTop: "5px" }}>
//           Always consult a qualified healthcare professional.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;
