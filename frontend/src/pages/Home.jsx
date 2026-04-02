
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

