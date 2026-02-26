// function Dashboard() {
//   return (
//     <div className="page">
//       <h1>Admin Dashboard</h1>
//       <div className="grid">
//         <div className="card">Patient Flow</div>
//         <div className="card">Priority Queue</div>
//         <div className="card">Doctors</div>
//         <div className="card">Reports</div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f4f7f9] p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Users
          </h2>
          <p className="text-3xl font-bold text-teal-700 mt-2">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Appointments
          </h2>
          <p className="text-3xl font-bold text-teal-700 mt-2">45</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Doctors
          </h2>
          <p className="text-3xl font-bold text-teal-700 mt-2">12</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Admin Actions
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition">
            Manage Users
          </button>

          <button className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition">
            View Appointments
          </button>

          <button className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition">
            Manage Doctors
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;