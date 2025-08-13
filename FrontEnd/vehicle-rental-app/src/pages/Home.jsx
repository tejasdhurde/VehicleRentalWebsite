import React, { useEffect, useState } from 'react';
import FeaturedVehicleCard from '../components/vehicle/FeaturedVehicleCard';
import '../assets/Home.css';

const Home = () => {
  const [vehicles, setVehicles] = useState([]); // full list
  const [filteredVehicles, setFilteredVehicles] = useState([]); // filtered list
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/vehicles');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setVehicles(data);
        setFilteredVehicles(data); 
      } catch (error) {
        console.error('Error fetching featured vehicles:', error.message);
      }
    };

    fetchFeaturedVehicles();
  }, []);

  // 🔁 Automatically update filtered list on search term change
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredVehicles(vehicles); // Show all
    } else {
      const filtered = vehicles.filter(vehicle =>
        vehicle.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVehicles(filtered);
    }
  }, [searchTerm, vehicles]);

  return (
    <div className="home-page">
      <section className="hero-section text-white text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">🚗 Find Your Perfect Ride</h1>
          <p className="lead">Rent cars, bikes, or vans at the best price near you</p>
          <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search vehicle"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
      </section>

      <section className="featured-section container mt-5">
        <h2 className="text-center mb-4 text-primary fw-bold">🌟 Featured Vehicles</h2>
        <div className="row">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
              <FeaturedVehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
            ))
          ) : (
            <p className="text-center text-muted">No vehicles match your search.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
