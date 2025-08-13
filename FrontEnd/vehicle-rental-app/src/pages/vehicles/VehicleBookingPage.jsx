import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleGallery from '../../components/vehicle/VehicleGallery';
import BookingForm from '../../components/booking/BookingForm';
import { BookingContext } from '../../context/BookingContext';
import '../../assets/VehicleDetails.css';
import '../../assets/BookingPage.css';

const VehicleBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectVehicle } = useContext(BookingContext);
  const [vehicle, setVehicle] = useState(null);
  const [reviews, setReviews] = useState([]);

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

        if (!response.ok) throw new Error('Failed to fetch vehicle details');

        const data = await response.json();
        console.log("Vehicle Data:", data);
        setVehicle(data);
      } catch (err) {
        console.error('Error fetching vehicle:', err.message);
      }
    };

    fetchVehicle();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reviews/${id}`);
        if (!response.ok) throw new Error('Failed to fetch reviews');

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Review fetch error:', err.message);
      }
    };

    fetchReviews();
  }, [id]);

  const handleFormSubmit = (formData) => {
    const days =
      (new Date(formData.returnDate) - new Date(formData.pickupDate)) /
      (1000 * 60 * 60 * 24);

    const costPerDay =
      typeof vehicle.pricePerDay === 'string'
        ? parseInt(vehicle.pricePerDay.replace(/[^\d]/g, '')) || 1000
        : vehicle.pricePerDay || 1000;

    const totalCost = costPerDay * days;

    selectVehicle(vehicle);
    navigate('/booking/summary', {
      state: {
        vehicle,
        bookingDetails: {
          ...formData,
          totalCost
        }
      }
    });
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
    <div className="container mt-4 mb-5 vehicle-booking-wrapper vehicle-details-page">
      <div className="row">
        <div className="col-md-7 mb-4">
          <div className="vehicle-header mb-3">
            <h2 className="fw-bold text-primary">{vehicle.title}</h2>
          </div>
          <VehicleGallery images={vehicle.images} />

          <div className="vehicle-info mt-4">
            <p className="lead">{vehicle.description}</p>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li><span className="icon">⛽</span><strong>Fuel Type:</strong> {vehicle.fuelType}</li>
                  <li><span className="icon">🧍‍♂️</span><strong>Seating Capacity:</strong> {vehicle.seatingCapacity}</li>
                  <li><span className="icon">📍</span><strong>Location:</strong> {vehicle.location}</li>
                  <li><span className="icon">📅</span><strong>Posted On:</strong> {new Date(vehicle.createdAt).toLocaleDateString()}</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li><span className="icon">💰</span><strong>Rental Price:</strong> ₹{vehicle.pricePerDay} / day</li>
                  <li><span className="icon">✅</span><strong>Available:</strong> {vehicle.available ? 'Yes' : 'No'}</li>
                  <li><span className="icon">👤</span><strong>Owner:</strong> {vehicle.ownerName}</li>
                  <li><span className="icon">🚙</span><strong>Category:</strong> {vehicle.category}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5 mb-4">
          <div className="booking-inner h-100 p-3 bg-light rounded shadow-sm">
            <BookingForm
              vehicle={vehicle}
              onSubmit={handleFormSubmit}
              showOnlyDates={true}
            />
          </div>
        </div>
      </div>

      <div className="vehicle-reviews-section mt-4 p-4 bg-light rounded shadow-sm">
        <h5 className="mb-3 text-primary fw-bold">📢 Customer Reviews</h5>
        {reviews.length === 0 ? (
          <div>No reviews yet. Be the first to review this vehicle!</div>
        ) : (
          reviews.map((review) => (
            <div key={review.reviewId} className="mb-3 border-bottom pb-2">
              <strong>{review.userName}</strong>{' '}
              <span className="text-warning">⭐ {review.rating}/5</span>
              <p className="mb-1">{review.comment}</p>
              <small className="text-muted">
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VehicleBookingPage;
