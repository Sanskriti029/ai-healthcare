import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
import Triage from "./pages/Triage";
import Appointment from "./pages/Appointment";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalSearch from "./pages/HospitalSearch";

import DoctorSearch from "./pages/DoctorSearch";
import PharmacySearch from "./pages/PharmacySearch";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
       <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<AdminDashboard />} />
    <Route path="/doctors" element={<DoctorSearch />} />
    <Route path="/pharmacies" element={<PharmacySearch />} />
    <Route path="/hospitals" element={<HospitalSearch />} />
    <Route path="/triage" element={<Triage />} />
    <Route path="/appointment" element={<Appointment />} />
  </Route>
</Routes>
    
    </BrowserRouter>
  );
}

export default App;
