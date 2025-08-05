import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/BookingSummary.css';

const BookingSummary = () => {
  const { state } = useLocation();
  const { vehicle, bookingDetails } = state || {};
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  if (!vehicle || !bookingDetails) {
    return (
      <div className="booking-summary-container">
        <div className="booking-warning">
          ⚠️ Missing booking info. Please go back and try again.
        </div>
      </div>
    );
  }

  const handleConfirmBooking = () => {
    setConfirmed(true);
    setTimeout(() => navigate("/dashboard/bookings"), 3000);
  };

  // ✅ Use image URL if available
  const imageUrl =
    vehicle.images?.[0]?.imageUrl
      ? `http://localhost:8080${vehicle.images[0].imageUrl}`
      : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div className="booking-summary-container">
      <div className="booking-header">
        <h2>Booking Summary</h2>
        <p>Review your booking before confirming.</p>
      </div>

      {confirmed && (
        <div className="booking-success">
          ✅ Booking confirmed! Redirecting to your dashboard...
        </div>
      )}

      <div className="booking-grid">
        {/* Vehicle Card */}
        <div className="booking-card">
          <img
            src={imageUrl}
            alt={vehicle.title}
            className="booking-img"
          />
          <div className="booking-card-body">
            <h3>{vehicle.title}</h3>
            <p className="booking-desc">{vehicle.description}</p>
            <p className="booking-price">₹{vehicle.pricePerDay} / day</p>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="booking-card">
          <div className="booking-card-body">
            <h3 className="text-primary">Your Booking Details</h3>
            <p><strong>📅 Pickup Date:</strong> {bookingDetails.pickupDate}</p>
            <p><strong>📆 Return Date:</strong> {bookingDetails.returnDate}</p>
            <p><strong>📍 Pickup Location:</strong> {bookingDetails.pickupLocation}</p>
            <p><strong>🧍 Seats:</strong> {bookingDetails.seats}</p>
            <hr />
            <p className="booking-total">Total: ₹{bookingDetails.totalCost}</p>
          </div>
        </div>
      </div>

      {!confirmed && (
        <div className="booking-confirm-btn-wrapper">
          <button className="booking-confirm-btn" onClick={handleConfirmBooking}>
            ✅ Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
