import React, { useState } from "react";
import "../../assets/BookingForm.css"; // Optional: for custom styles

const BookingForm = ({ onSubmit, bookedDates = [] }) => {
  const [form, setForm] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    seats: 1,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // Reset error when user changes input
  };

  const isDateDisabled = (dateStr) => bookedDates.includes(dateStr);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if selected date is booked
    if (isDateDisabled(form.pickupDate) || isDateDisabled(form.returnDate)) {
      setError("One or both selected dates are already booked.");
      return;
    }

    onSubmit(form);
  };

  const renderDateInput = (label, name, value) => (
    <div className="col-md-6 mb-4">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={handleChange}
        className={`form-control shadow-sm ${isDateDisabled(value) ? "is-invalid" : ""}`}
        required
        min={new Date().toISOString().split("T")[0]}
      />
      {isDateDisabled(value) && (
        <div className="invalid-feedback">This date is already booked.</div>
      )}
    </div>
  );

  return (
    <form
      className="booking-form bg-white p-4 p-md-5 rounded shadow-lg border border-2"
      onSubmit={handleSubmit}
    >
      <h4 className="mb-4 text-center text-primary fw-bold border-bottom pb-2">
        Book Your Ride
      </h4>

      {error && (
        <div className="alert alert-danger text-center py-2">{error}</div>
      )}

      <div className="row">
        {renderDateInput("Pickup Date", "pickupDate", form.pickupDate)}
        {renderDateInput("Return Date", "returnDate", form.returnDate)}
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Pickup Location</label>
        <input
          type="text"
          className="form-control shadow-sm"
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          placeholder="e.g. Pune Station, MG Road"
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Seats Required</label>
        <input
          type="number"
          className="form-control shadow-sm"
          name="seats"
          min="1"
          max="7"
          value={form.seats}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
        Continue to Summary
      </button>
    </form>
  );
};

export default BookingForm;
