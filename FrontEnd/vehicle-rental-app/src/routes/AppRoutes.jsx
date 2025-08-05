import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";

import VehicleList from "../pages/vehicles/VehicleList";
import VehicleDetails from "../pages/vehicles/VehicleDetails";

import BookingPage from "../pages/booking/BookingPage";
import BookingSummary from "../components/booking/BookingSummary";

import MyBookings from "../pages/user/MyBookings";

// Admin Dashboard
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageVehicles from "../pages/admin/ManageVehicles";
import AddVehicle from "../pages/admin/AddVehicle";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/summary" element={<BookingSummary />} />

        <Route path="/dashboard/bookings" element={<MyBookings />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<div>Welcome, Admin!</div>} />
          <Route path="manage-vehicles" element={<ManageVehicles />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;


