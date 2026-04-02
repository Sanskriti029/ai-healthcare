
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();

    // ✅ Check passwords match
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("/resetpassword", {
        email: form.email,
        newPassword: form.newPassword
      });

      alert("Password reset successfully ✅");
      navigate("/"); // back to login
    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f7f9"
    }}>
      <form
        onSubmit={resetPassword}
        

         className="bg-white p-10 w-[350px] rounded-xl flex flex-col gap-4 shadow-lg"
      >
        <h2 style={{ textAlign: "center" }}>Forget  Password</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
           className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          
          required
        />

        {/* New Password */}
        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          } 
           className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
       
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
           className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          
          required
        />

        <button
          type="submit"
          style={{ width: "100%", marginTop: "10px" }}
          className="bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
