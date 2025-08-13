import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/BookingSummary.css';

const BookingSummary = () => {
  const { state } = useLocation();
  const { vehicle, bookingDetails } = state || {};
  const navigate = useNavigate();

  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = vehicle?.ownerId === user?.userId;

  if (!vehicle || !bookingDetails) {
    return (
      <div className="booking-summary-container">
        <div className="booking-warning">
          ⚠️ Missing booking info. Please go back and try again.
        </div>
      </div>
    );
  }

 


  const handleConfirmBooking = async () => {
    try {
      if (!user || !user.userId || !user.token) {
        setError("User authentication info missing.");
        return;
      }
  
      const requestBody = {
        vehicleId: vehicle.vehicleId,
        startDate: bookingDetails.pickupDate,
        endDate: bookingDetails.returnDate,
      };
  
      const response = await fetch(
        `http://localhost:8080/api/bookings/customer/${user.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${user.tokenType || "Bearer"} ${user.token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      const responseText = await response.text();
  
      if (!response.ok) {
        if (responseText.includes("Vehicle is already booked during")) {
          const cleanMessage = responseText.replace("An unexpected error occurred: ", "");
          setError(cleanMessage);
        
          setTimeout(() => navigate(`/vehicles/${vehicle.vehicleId}`), 5000);
        } else {
          throw new Error(responseText || "Booking failed. Please try again.");
        }
        return;
      }
  
      setConfirmed(true);
      setTimeout(() => navigate("/dashboard/bookings"), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    }
  };
  
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

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      <div className="booking-grid">
        {/* Vehicle Card */}
        <div className="booking-card">
          <img src={imageUrl} alt={vehicle.title} className="booking-img" />
          <div className="booking-card-body">
            <h3>{vehicle.title}</h3>
            <p className="booking-desc">{vehicle.description}</p>
            <p className="booking-price">₹{vehicle.pricePerDay} / day</p>
          </div>
        </div>

        <div className="booking-card">
          <div className="booking-card-body">
            <h3 className="text-primary">Your Booking Details</h3>
            <p><strong>📅 Pickup Date:</strong> {bookingDetails.pickupDate}</p>
            <p><strong>📆 Return Date:</strong> {bookingDetails.returnDate}</p>
            {bookingDetails.pickupLocation && (
              <p><strong>📍 Pickup Location:</strong> {bookingDetails.pickupLocation}</p>
            )}
            {bookingDetails.seats && (
              <p><strong>🧍 Seats:</strong> {bookingDetails.seats}</p>
            )}
            <hr />
            <p className="booking-total">Total: ₹{bookingDetails.totalCost}</p>
          </div>
        </div>
      </div>

      {!confirmed && (
        <div className="booking-confirm-btn-wrapper">
          {isOwner ? (
            <div className="alert alert-info text-center fs-5 mt-3">
              ⚠️ You cannot book your own vehicle 😊
            </div>
          ) : (
            <button className="booking-confirm-btn" onClick={handleConfirmBooking}>
              ✅ Confirm Booking
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
