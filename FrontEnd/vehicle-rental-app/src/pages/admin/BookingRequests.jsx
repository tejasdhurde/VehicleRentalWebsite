import React, { useEffect, useState, useCallback } from 'react';
import '../../assets/ManageVehicles.css';

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const tokenType = user?.tokenType || 'Bearer';
  const ownerId = user?.userId;

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/bookings/owner/${ownerId}`, {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch booking requests:', error);
      alert('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  }, [ownerId, token, tokenType]);

  useEffect(() => {
    if (ownerId) {
      fetchBookings();
    }
  }, [ownerId, fetchBookings]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/owner/${ownerId}/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify({ status }), 
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      fetchBookings(); 
    } catch (error) {
      console.error(error);
      alert('Error updating booking status');
    }
  };

  if (loading) return <p>Loading booking requests...</p>;

  return (
    <div className="manage-vehicles-page">
      <h4 className="mb-4 text-primary fw-bold">📋 Booking Requests</h4>

      {bookings.length === 0 ? (
        <p className="text-muted">No booking requests found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded overflow-hidden">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th>Vehicle</th>
                <th>Customer</th>
                <th>Booking Dates</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.vehicleTitle}</td>
                  <td>{booking.customerName}</td>
                  <td>
                    {new Date(booking.startDate).toLocaleDateString()} →{' '}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td>₹{booking.totalCost}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === 'PENDING' ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleStatusChange(booking.bookingId, 'CONFIRMED')}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleStatusChange(booking.bookingId, 'CANCELLED')}
                        >
                          ❌ Decline
                        </button>
                      </>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingRequests;
