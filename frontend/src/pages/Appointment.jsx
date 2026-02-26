function Appointment() {
  return (
    <div className="h-screen flex justify-center items-center bg-[#f4f7f9]">
      <div className="bg-white p-8 w-[350px] rounded-xl shadow-lg flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Book Appointment
        </h2>

        <input
          type="text"
          placeholder="Select Department"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />

        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />

        <button className="bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition">
          Book
        </button>
      </div>
    </div>
  );
}

export default Appointment;