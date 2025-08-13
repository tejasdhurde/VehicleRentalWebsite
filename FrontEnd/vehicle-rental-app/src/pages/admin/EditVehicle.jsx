import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const EditVehicle = () => {
  const { id } = useParams(); // vehicle ID from URL
  const navigate = useNavigate();
  const location = useLocation();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const tokenType = user?.tokenType || 'Bearer';

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/vehicles/${id}`, {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        });
        const data = await res.json();
        setVehicle(data);
      } catch (err) {
        console.error('Failed to fetch vehicle:', err);
      }
    };

    if (location.state?.vehicle) {
      setVehicle(location.state.vehicle);
    } else {
      fetchVehicle();
    }
  }, [id, location.state, token, tokenType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicle((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`http://localhost:8080/api/vehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify(vehicle),
      });

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        await fetch(`http://localhost:8080/api/vehicles/${id}/images`, {
          method: 'POST',
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
          body: formData,
        });
      }

      alert('✅ Vehicle updated successfully!');
      navigate('/admin/manage-vehicles');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to update vehicle.');
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle) return <p>Loading vehicle details...</p>;

  return (
    <div className="container mt-4">
      <h4>Edit Vehicle</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={vehicle.title}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <select
          name="category"
          value={vehicle.category || ''}
          onChange={handleChange}
          required
          className="form-control mb-2"
        >
          <option value="">Select Category</option>
          <option value="SEDAN">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="BIKE">Bike</option>
        </select>

        <input
          type="number"
          step="0.01"
          name="pricePerDay"
          placeholder="Price Per Day"
          value={vehicle.pricePerDay}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          value={vehicle.fuelType}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <input
          type="number"
          name="seatingCapacity"
          placeholder="Seating Capacity"
          value={vehicle.seatingCapacity}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={vehicle.location}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={vehicle.description}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />

        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="available"
            checked={vehicle.available}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">Available</label>
        </div>

        {vehicle.imageUrls?.length > 0 && (
          <div className="mb-3">
            <label>Current Image:</label>
            <div>
              <img
                src={vehicle.imageUrls[0]}
                alt="Vehicle"
                style={{ maxHeight: '150px', borderRadius: '6px' }}
              />
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="form-control mb-3"
        />

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Updating...' : 'Update Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default EditVehicle;
