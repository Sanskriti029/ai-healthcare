import { Link } from "react-router-dom";


const features = [
  {
    title: "AI-Powered Analysis",
    desc: "Advanced AI analyzes your symptoms in seconds to identify possible conditions.",
  },
  {
    title: "Medicine Suggestions",
    desc: "Get personalized medicine recommendations with dosage information.",
  },
  {
    title: "PDF Report",
    desc: "Download a detailed health analysis report as a PDF for your records.",
  },
];

const Home = () => {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "Arial" }}>
      
      {/* HERO SECTION */}
      <section style={{ padding: "80px 20px", textAlign: "center", background: "#f5f7fa", color:"black" }}>
        
        <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
          Your AI Health
          <br />
          <span style={{ color: "#2563eb" }}>
            Symptom Analyzer
          </span>
        </h1>

        <p style={{ marginTop: "20px", maxWidth: "600px", marginInline: "auto" }}>
          Describe your symptoms and receive instant AI-powered analysis,
          possible conditions, medicine suggestions, and a downloadable PDF report.
        </p>

        <div style={{ marginTop: "30px" }}>
          <Link to="/triage">
            <button
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                cursor: "pointer",
                background : "#008080",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                transition: "background 0.3s",
              }}
            >
              Start Analysis
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "40px" }}>
          How It Works
        </h2>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                width: "280px",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                {feature.title}
              </h3>

              <p style={{ marginTop: "10px", fontSize: "14px" }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ddd", padding: "20px", textAlign: "center", fontSize: "14px" }}>
        <p>AI Healthcare — Powered by AI for educational purposes only.</p>
        <p style={{ marginTop: "5px" }}>
          Always consult a qualified healthcare professional.
        </p>
      </footer>
    </div>
  );
};

export default Home;

// import { Link } from "react-router-dom";
// import heroImage from "../assets/ai-healthcare.png";

// const features = [
//   {
//     title: "AI-Powered Analysis",
//     desc: "Advanced AI analyzes your symptoms in seconds to identify possible conditions.",
//   },
//   {
//     title: "Medicine Suggestions",
//     desc: "Get personalized medicine recommendations with dosage information.",
//   },
//   {
//     title: "PDF Report",
//     desc: "Download a detailed health analysis report as a PDF for your records.",
//   },
// ];

// const Home = () => {
//   return (
//     <div style={{ minHeight: "100vh", fontFamily: "Arial" }}>
      
//       {/* HERO SECTION — MODERN LAYOUT */}
//       <section
//         style={{
//           padding: "80px 40px",
//           background: "#f5f7fa",
//           color:"black"
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "60px",
//             flexWrap: "wrap", // responsive
//             maxWidth: "1200px",
//             margin: "auto",
//           }}
//         >
          
//           {/* LEFT — TEXT */}
//           <div style={{ flex: "1", minWidth: "320px" }}>
//             <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>
//               Your AI Health
//               <br />
//               <span style={{ color: "#2563eb" }}>
//                 Symptom Analyzer
//               </span>
//             </h1>

//             <p style={{ marginTop: "20px", fontSize: "16px", lineHeight: "1.6" }}>
//               Describe your symptoms and receive instant AI-powered analysis,
//               possible conditions, medicine suggestions, and a downloadable PDF report.
//             </p>

//             <div style={{ marginTop: "30px" }}>
//               <Link to="/triage">
//                 <button
//                   style={{
//                     padding: "14px 28px",
//                     fontSize: "16px",
//                     cursor: "pointer",
//                     background: "#008080",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "8px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   Start Analysis
//                 </button>
//               </Link>
//             </div>
//           </div>

//           {/* RIGHT — IMAGE */}
//           <div style={{ flex: "1", minWidth: "320px", textAlign: "center" }}>
//             <img
//               src={heroImage}
//               alt="AI Healthcare"
//               style={{
//                 width: "100%",
//                 maxWidth: "520px",
//                 borderRadius: "14px",
//                 boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
//               }}
//             />
//           </div>

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