// src/components/vehicle/FeaturedVehicleCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/FeaturedVehicleCard.css';

const FeaturedVehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const imageUrl =
    vehicle.images?.[0]?.imageUrl && vehicle.images[0].imageUrl !== 'string'
      ? `http://localhost:8080${vehicle.images[0].imageUrl}`
      : 'https://via.placeholder.com/400x250?text=No+Image';

  const handleCardClick = () => {
    navigate(`/vehicles/${vehicle.vehicleId}`); 
  };

  return (
    <div
      className="col-md-4 mb-4"
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <div className="vehicle-card card shadow-lg h-100 border-0">
        <div className="card-img-wrapper">
          <img
            src={imageUrl}
            className="card-img-top vehicle-image"
            alt={vehicle.title}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fw-bold text-dark">{vehicle.title}</h5>
            <p className="card-text text-muted">{vehicle.description}</p>
          </div>
          <div>
            <p className="vehicle-price text-primary fw-semibold fs-5 mb-0">
              ₹{vehicle.pricePerDay} <span className="fs-6 text-muted">/ day</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicleCard;
