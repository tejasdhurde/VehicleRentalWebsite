import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const tokenType = user?.tokenType || 'Bearer';
  const ownerId = user?.userId;

  const [vehicle, setVehicle] = useState({
    title: '',
    category: '',
    pricePerDay: '',
    fuelType: '',
    seatingCapacity: '',
    description: '',
    available: true,
    location: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicle({
      ...vehicle,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !ownerId) {
      alert('User not authenticated.');
      return;
    }

    if (!imageFile) {
      alert('Please select an image.');
      return;
    }

    setLoading(true);

    try {
      const vehiclePayload = {
        ...vehicle,
        ownerId
      };

      const vehicleRes = await fetch('http://localhost:8080/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${tokenType} ${token}`
        },
        body: JSON.stringify(vehiclePayload)
      });

      if (!vehicleRes.ok) throw new Error('Vehicle creation failed');

      const createdVehicle = await vehicleRes.json();
      const vehicleId = createdVehicle.vehicleId;

      const formData = new FormData();
      formData.append('file', imageFile);

      const imageRes = await fetch(`http://localhost:8080/api/vehicles/${vehicleId}/images`, {
        method: 'POST',
        headers: {
          'Authorization': `${tokenType} ${token}`
        },
        body: formData
      });

      if (!imageRes.ok) throw new Error('Image upload failed');

      alert('✅ Vehicle added successfully!');
      navigate('/admin/manage-vehicles');

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Add New Vehicle</h4>
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
          value={vehicle.category}
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
          className="form-control mb-3"
        />

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
