import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/AdminSidebar.css';

const AdminSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const ownerName = user?.email || 'Owner';

  return (
    <div className="admin-sidebar p-3 bg-white rounded shadow-sm">
      <h5 className="sidebar-title mb-4 text-primary fw-bold text-center">
        {ownerName}
      </h5>

      <NavLink
        to="/admin/manage-vehicles"
        className={({ isActive }) =>
          `sidebar-link d-block mb-2 ${isActive ? 'active' : ''}`
        }
      >
        🛠️ Manage Vehicles
      </NavLink>

      <NavLink
        to="/admin/add-vehicle"
        className={({ isActive }) =>
          `sidebar-link d-block mb-2 ${isActive ? 'active' : ''}`
        }
      >
        ➕ Add Vehicle
      </NavLink>

      <NavLink
        to="/admin/booking-requests"
        className={({ isActive }) =>
          `sidebar-link d-block mb-2 ${isActive ? 'active' : ''}`
        }
      >
        📋 Booking Requests
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
