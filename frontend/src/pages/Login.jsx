import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import ForgetPassword from "./ForgotPassword";
import API from "../api";

function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

   const button = async (e) => {
    e.preventDefault();
    const res = await API.post("/forgetpassword", form);
    localStorage.setItem("token", res.data.token);
    navigate("/forgetpassword");
  };


  return (
    <div className="h-screen flex justify-center items-center bg-[#f4f7f9]">
      <form
        onSubmit={submit}
        className="bg-white p-10 w-[350px] rounded-xl flex flex-col gap-4 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>

        <input
          type="email"
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

        <button
          type="submit"
          className="bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition"
        >
          Login
        </button>
        
        
         <Link
          to="/forgot-password"
          className="text-center text-sm text-teal-700 hover:underline"
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}

export default Login;