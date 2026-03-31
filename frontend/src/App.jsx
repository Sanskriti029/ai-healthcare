import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Triage from "./pages/Triage";
import Appointment from "./pages/Appointment";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalSearch from "./pages/HospitalSearch";
import Admin from "./pages/Admin";
import DoctorSearch from "./pages/DoctorSearch";
import PharmacySearch from "./pages/PharmacySearch";
import UserDashboard from "./pages/Userdashboard";
import SearchAll from "./pages/SearchAll";

import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
        
          {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
          <Route path="/doctors" element={<DoctorSearch />} />
          <Route path="/pharmacies" element={<PharmacySearch />} />
          <Route path="/hospitals" element={<HospitalSearch />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/pharmacies/area" element={<PharmacySearch />} />
          <Route path="/search" element={<SearchAll />} />
          {/* <Route path="/admin" element={<Admin/>}/> */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/admin"element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
