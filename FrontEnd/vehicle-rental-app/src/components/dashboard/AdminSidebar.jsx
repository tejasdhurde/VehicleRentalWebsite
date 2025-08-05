import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar p-3 bg-white rounded shadow-sm">
      <h5 className="sidebar-title mb-4 text-primary fw-bold text-center">Admin Panel</h5>

      <NavLink
        to="/admin/add-vehicle"
        className="sidebar-link"
      >
        ➕ Add Vehicle
      </NavLink>

      <NavLink
        to="/admin/manage-vehicles"
        className="sidebar-link"
      >
        🛠️ Manage Vehicles
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
