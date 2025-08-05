import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/VehicleCard.css";

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const imageUrl =
    vehicle.images?.[0]?.imageUrl
      ? `http://localhost:8080${vehicle.images[0].imageUrl}`
      : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="col-md-4 mb-4">
      <div className="vehicle-card card border-0 shadow-lg h-100">
        <div className="vehicle-card-image-wrapper">
          <img
            src={imageUrl}
            className="card-img-top vehicle-card-image"
            alt={vehicle.title}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-dark fw-bold">{vehicle.title}</h5>
            <p className="card-text text-muted">
              {vehicle.description.slice(0, 80)}...
            </p>
          </div>
          <div>
            <p className="vehicle-card-price text-primary fs-5 fw-semibold mt-2 mb-3">
              ₹{vehicle.pricePerDay}
              <span className="fs-6 text-muted"> / day</span>
            </p>
            <button
              className="btn btn-outline-primary w-100 rounded-pill"
              onClick={() =>
                navigate(`/vehicles/${vehicle.vehicleId}`, { state: { vehicle } })
              }
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
