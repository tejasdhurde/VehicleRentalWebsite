import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleGallery from '../../components/vehicle/VehicleGallery';
import { BookingContext } from '../../context/BookingContext';
import '../../assets/VehicleDetails.css';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectVehicle } = useContext(BookingContext);

  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        const tokenType = user?.tokenType || 'Bearer';

        const response = await fetch(`http://localhost:8080/api/vehicles/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `${tokenType} ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch vehicle details');
        }

        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error('Error fetching vehicle:', error.message);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleBooking = () => {
    selectVehicle(vehicle);
    navigate('/booking', { state: { vehicle } });
  };

  if (!vehicle) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          ❌ Vehicle not found. Please go back and select a valid vehicle.
        </div>
      </div>
    );
  }

  return (
    <div className="container vehicle-details-page mt-4 mb-5">
      <div className="vehicle-header mb-4">
        <h2 className="fw-bold text-primary">{vehicle.title}</h2>
        <p className="text-muted">{vehicle.category}</p>
      </div>

      <VehicleGallery images={vehicle.images} />

      <div className="vehicle-info mt-4 p-4 bg-white rounded shadow-sm">
        <p className="lead">{vehicle.description}</p>
        <p><strong>Rental Price:</strong> ₹{vehicle.pricePerDay} / day</p>

        <button className="btn btn-success mt-3 w-100" onClick={handleBooking}>
          🚗 Book This Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;
