import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    await API.post("/register", form);

    alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#f4f7f9]">
      <form className="bg-white p-10 w-[350px] rounded-xl flex flex-col gap-4 shadow-lg" onSubmit={submit}>
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Account</h2>

        <input
          placeholder="Name"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit"  className="bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition hover:cursor-pointer">Register</button>
      </form>
    </div>
  );
}

export default Register;