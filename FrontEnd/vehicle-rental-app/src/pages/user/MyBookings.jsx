import React from 'react';
import '../../assets/MyBookings.css'; 
const MyBookings = () => {
 
  const bookings = [
    {
      id: 1,
      vehicle: 'Honda City',
      date: '2025-08-15',
      location: 'Pune',
    },
    {
      id: 2,
      vehicle: 'Toyota Fortuner',
      date: '2025-09-01',
      location: 'Mumbai',
    },
  ];

  return (
    <div className="my-bookings container mt-4">
      <h3 className="text-center text-primary mb-4 fw-bold">🚗 My Vehicle Bookings</h3>

      {bookings.length === 0 ? (
        <div className="alert alert-info text-center">
          No bookings yet. Start booking your ride today!
        </div>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-6 mb-4">
              <div className="booking-card shadow-sm p-4 rounded">
                <h5 className="vehicle-title mb-2">{booking.vehicle}</h5>
                <p className="mb-1"><strong>Date:</strong> {booking.date}</p>
                <p><strong>Location:</strong> {booking.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
