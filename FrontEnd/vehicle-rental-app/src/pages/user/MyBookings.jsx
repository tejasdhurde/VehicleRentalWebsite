import React, { useEffect, useState, useCallback } from 'react';
import '../../assets/MyBookings.css';

const MyBookings = () => {
  const [successfulPayments, setSuccessfulPayments] = useState([]);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editBooking, setEditBooking] = useState(null);
  const [formData, setFormData] = useState({ startDate: "", endDate: "" });
  const [paymentBooking, setPaymentBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const tokenType = user?.tokenType || 'Bearer';
  const userId = user?.userId;

  const fetchPayments = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/api/payments/successful", {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch successful payments");
      const data = await res.json();
      setSuccessfulPayments(data);
    } catch (err) {
      console.error("Payment fetch error:", err.message);
    }
  }, [token, tokenType]);
  

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/bookings/customer/${userId}`, {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch bookings.");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, token, tokenType]);

  useEffect(() => {
    if (userId && token) {
      fetchBookings();
      fetchPayments(); 
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, [fetchBookings, fetchPayments, token, userId]);


  const isBookingPaid = (bookingId) => {
    return successfulPayments.some(payment => payment.bookingId === bookingId);
  };
  

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/bookings/customer/${userId}/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete booking.");
      fetchBookings();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleEditClick = (booking) => {
    setEditBooking(booking);
    setFormData({
      startDate: booking.startDate,
      endDate: booking.endDate
    });
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) {
      return alert("Both dates are required.");
    }

    try {
      const res = await fetch(`http://localhost:8080/api/bookings/customer/${userId}/${editBooking.bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update booking.");
      setEditBooking(null);
      fetchBookings();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/payments/customer/${userId}/${paymentBooking.bookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify({ paymentMethod }),
      });

      if (!res.ok) throw new Error("Payment failed");

      alert("✅ Payment Successful!");
      setPaymentBooking(null);
      fetchBookings();
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="my-bookings container mt-4">
      <h3 className="text-center text-primary mb-4 fw-bold">🚗 My Vehicle Bookings</h3>

      {loading ? (
        <div className="text-center">Loading your bookings...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="alert alert-info text-center">
          No bookings yet. Start booking your ride today!
        </div>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.bookingId} className="col-md-6 mb-4">
              <div className="booking-card shadow-sm p-4 rounded">
                <h5 className="vehicle-title mb-2">{booking.vehicleTitle}</h5>
                <p><strong>Start Date:</strong> {booking.startDate}</p>
                <p><strong>End Date:</strong> {booking.endDate}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Total Cost:</strong> ₹{booking.totalCost}</p>

                {booking.status === "PENDING" && (
                  <>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(booking)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(booking.bookingId)}>
                      🗑️ Delete
                    </button>
                  </>
                )}

               {booking.status === "COMPLETED" && !isBookingPaid(booking.bookingId) && (
                  <button
                    className="btn btn-sm btn-success mt-2"
                    onClick={() => setPaymentBooking(booking)}
                  >
                    💳 Payment
                  </button>
                )}

                {booking.status === "COMPLETED" && isBookingPaid(booking.bookingId) && (
                  <button className="btn btn-sm btn-outline-success mt-2" disabled>
  ✅ Paid
</button>
                          )}

              </div>
            </div>
          ))}
        </div>
      )}

      {editBooking && (
        <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleEditSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Booking #{editBooking.bookingId}</h5>
                <button type="button" className="btn-close" onClick={() => setEditBooking(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">💾 Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditBooking(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {paymentBooking && (
        <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handlePaymentSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Make Payment for Booking #{paymentBooking.bookingId}</h5>
                <button type="button" className="btn-close" onClick={() => setPaymentBooking(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Total Amount:</strong> ₹{paymentBooking.totalCost}</p>
                <div className="mb-3">
                  <label className="form-label">Select Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="NET_BANKING">Net Banking</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">💸 Pay Now</button>
                <button type="button" className="btn btn-secondary" onClick={() => setPaymentBooking(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
