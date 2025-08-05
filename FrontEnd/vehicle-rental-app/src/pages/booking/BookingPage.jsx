import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingForm from "../../components/booking/BookingForm";
import "../../assets/BookingPage.css";

const BookingPage = () => {
  const { state } = useLocation();
  const vehicle = state?.vehicle;
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    const days =
      (new Date(formData.returnDate) - new Date(formData.pickupDate)) /
      (1000 * 60 * 60 * 24);

    const costPerDay =
      typeof vehicle.pricePerDay === "string"
        ? parseInt(vehicle.pricePerDay.replace(/[^\d]/g, "")) || 1000
        : vehicle.pricePerDay || 1000;

    const totalCost = costPerDay * days;

    navigate("/booking/summary", {
      state: {
        vehicle,
        bookingDetails: {
          ...formData,
          totalCost,
        },
      },
    });
  };

  // ✅ Safely extract image URL
  const imageUrl =
    vehicle?.images?.[0]?.imageUrl
      ? `http://localhost:8080${vehicle.images[0].imageUrl}`
      : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="booking-wrapper container">
      <div className="booking-inner">
        {vehicle && (
          <div className="vehicle-info text-center mb-3">
            {/* ✅ Updated image container */}
            <div
              className="mb-3"
              style={{
                width: "100%",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                overflow: "hidden"
              }}
            >
              <img
                src={imageUrl}
                alt={vehicle.title}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain"
                }}
              />
            </div>

            <h5>{vehicle.title}</h5>
            <p className="mb-1">{vehicle.description}</p>
            <p className="fw-bold text-primary">₹{vehicle.pricePerDay} / day</p>
          </div>
        )}

        {vehicle && (
          <BookingForm vehicle={vehicle} onSubmit={handleFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default BookingPage;
