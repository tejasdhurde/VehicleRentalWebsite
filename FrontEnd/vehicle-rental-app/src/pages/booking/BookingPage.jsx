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

  return (
    <div className="booking-wrapper container">
      <div className="booking-inner">
        {vehicle && (
          <BookingForm
            vehicle={vehicle}
            onSubmit={handleFormSubmit}
            showOnlyDates={true} 
          />
        )}
      </div>
    </div>
  );
};

export default BookingPage;
