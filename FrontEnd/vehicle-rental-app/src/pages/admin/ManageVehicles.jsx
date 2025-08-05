import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/ManageVehicles.css'; // ✅ Custom styles

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      title: 'Toyota Fortuner',
      type: 'SUV',
      price: 3500,
      image1: '',
      image2: '',
      description: '',
    },
    {
      id: 2,
      title: 'Honda City',
      type: 'Sedan',
      price: 2200,
      image1: '',
      image2: '',
      description: '',
    },
  ]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const handleEdit = (vehicle) => {
    navigate('/admin/add-vehicle', { state: { vehicle } });
  };

  return (
    <div className="manage-vehicles-page">
      <h4 className="mb-4 text-primary fw-bold">🚗 Manage Vehicles</h4>

      <div className="table-responsive shadow-sm rounded overflow-hidden">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price (₹/day)</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.title}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.price}</td>
                <td>
                  <div className="action-buttons d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleEdit(vehicle)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-4">
        <button
          className="btn btn-primary px-4"
          onClick={() => navigate('/admin/add-vehicle')}
        >
          ➕ Add New Vehicle
        </button>
      </div>
    </div>
  );
};

export default ManageVehicles;
