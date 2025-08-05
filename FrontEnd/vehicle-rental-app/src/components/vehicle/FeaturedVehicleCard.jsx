import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../assets/FeaturedVehicleCard.css';

const FeaturedVehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleBooking = () => {
    if (user) {
      navigate('/booking', { state: { vehicle } });
    } else {
      navigate('/login', { state: { from: '/booking', vehicle } });
    }
  };

  // Correct the image URL by prefixing backend host if image exists
  const imageUrl =
    vehicle.images?.[0]?.imageUrl && vehicle.images[0].imageUrl !== 'string'
      ? `http://localhost:8080${vehicle.images[0].imageUrl}`
      : 'https://via.placeholder.com/400x250?text=No+Image';

  return (
    <div className="col-md-4 mb-4">
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
            <p className="vehicle-price text-primary fw-semibold fs-5 mb-3">
              ₹{vehicle.pricePerDay} <span className="fs-6 text-muted">/ day</span>
            </p>
            <button
              className="btn btn-primary w-100 rounded-pill"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicleCard;
