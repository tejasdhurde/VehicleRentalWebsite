import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/dashboard/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel</h2>
      <div className="row">
        <div className="col-md-3 mb-4">
          <AdminSidebar />
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
