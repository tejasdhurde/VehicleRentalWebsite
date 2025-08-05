import React, { useEffect, useState } from 'react';
import FeaturedVehicleCard from '../components/vehicle/FeaturedVehicleCard';
import '../assets/Home.css';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/vehicles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
           
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setVehicles(data.slice(0, 6)); 
      } catch (error) {
        console.error('Error fetching featured vehicles:', error.message);
      }
    };

    fetchFeaturedVehicles();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section text-white text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">🚗 Find Your Perfect Ride</h1>
          <p className="lead">Rent cars, bikes, or vans at the best price near you</p>
          <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search vehicle, brand or type"
            />
            <button className="btn btn-light btn-search">Search</button>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="featured-section container mt-5">
        <h2 className="text-center mb-4 text-primary fw-bold">🌟 Featured Vehicles</h2>
        <div className="row">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <FeaturedVehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
            ))
          ) : (
            <p className="text-center text-muted">No featured vehicles available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
