import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/ManageVehicles.css';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const tokenType = user?.tokenType || 'Bearer';
  const ownerId = user?.userId;

  const fetchVehicles = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/vehicles/owner/${ownerId}`, {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error('Failed to fetch vehicles:', err);
      alert('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  }, [ownerId, token, tokenType]);

  useEffect(() => {
    if (ownerId) {
      fetchVehicles();
    }
  }, [ownerId, fetchVehicles]);

  const handleEdit = (vehicle) => {
    navigate(`/admin/edit-vehicle/${vehicle.vehicleId}`, { state: { vehicle } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const res = await fetch(`http://localhost:8080/api/vehicles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });

      if (res.ok) {
        alert('Vehicle deleted successfully.');
        fetchVehicles(); 
      } else {
        alert('Failed to delete vehicle.');
      }
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      alert('Server error while deleting vehicle.');
    }
  };

  if (loading) return <p>Loading vehicles...</p>;

  return (
    <div className="manage-vehicles-page">
      <h4 className="mb-4 text-primary fw-bold">🚗 Manage Vehicles</h4>

      {vehicles.length === 0 ? (
        <p className="text-muted">No vehicles found. Add one to get started.</p>
      ) : (
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
                <tr key={vehicle.vehicleId}>
                  <td>{vehicle.vehicleId}</td>
                  <td>{vehicle.title}</td>
                  <td>{vehicle.category}</td>
                  <td>{vehicle.pricePerDay}</td>
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
                        onClick={() => handleDelete(vehicle.vehicleId)}
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
      )}
    </div>
  );
};

export default ManageVehicles;
