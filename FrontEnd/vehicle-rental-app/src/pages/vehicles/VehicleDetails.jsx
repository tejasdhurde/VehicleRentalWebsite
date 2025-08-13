import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleGallery from '../../components/vehicle/VehicleGallery';
import { BookingContext } from '../../context/BookingContext';
import '../../assets/VehicleDetails.css';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectVehicle } = useContext(BookingContext);

  const [vehicle, setVehicle] = useState(null);

  // 📝 Dummy Reviews
  const reviews = [
    {
      reviewId: 1,
      userName: 'Alice Sharma',
      rating: 5,
      comment: 'Amazing car and very clean! Smooth experience.',
      date: '2025-08-01'
    },
    {
      reviewId: 2,
      userName: 'Ravi Deshmukh',
      rating: 4,
      comment: 'Car was well maintained. Booking was easy.',
      date: '2025-07-28'
    }
  ];

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        const tokenType = user?.tokenType || 'Bearer';

        const response = await fetch(`http://localhost:8080/api/vehicles/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `${tokenType} ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch vehicle details');
        }

        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error('Error fetching vehicle:', error.message);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleBooking = () => {
    selectVehicle(vehicle);
    navigate('/booking', { state: { vehicle } });
  };

  if (!vehicle) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          ❌ Vehicle not found. Please go back and select a valid vehicle.
        </div>
      </div>
    );
  }

  return (
    <div className="container vehicle-details-page mt-4 mb-5">
      <div className="vehicle-header mb-4">
        <h2 className="fw-bold text-primary">{vehicle.title}</h2>
        <p className="text-muted">{vehicle.category}</p>
      </div>

      <div className="row">
        <div className="col-md-7 mb-4">
          <VehicleGallery images={vehicle.images} />
        </div>

        <div className="col-md-5 mb-4">
          <div className="vehicle-info p-4 bg-white rounded shadow-sm h-100">
            <p className="lead">{vehicle.description}</p>
            <p><strong>Rental Price:</strong> ₹{vehicle.pricePerDay} / day</p>

            <button className="btn btn-success mt-3 w-100" onClick={handleBooking}>
              🚗 Book This Vehicle
            </button>
          </div>
        </div>
      </div>

      <div className="vehicle-reviews-section mt-4 p-4 bg-light rounded shadow-sm">
        <h5 className="mb-3 text-primary fw-bold">📢 Customer Reviews</h5>
        {reviews.map((review) => (
          <div key={review.reviewId} className="mb-3 border-bottom pb-2">
            <strong>{review.userName}</strong>{' '}
            <span className="text-warning">⭐ {review.rating}/5</span>
            <p className="mb-1">{review.comment}</p>
            <small className="text-muted">
              {new Date(review.date).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleDetails;
