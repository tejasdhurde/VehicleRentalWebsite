import React, { useEffect, useState } from 'react';
import VehicleCard from '../../components/vehicle/VehicleCard';
import '../../assets/VehicleList.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        const tokenType = user?.tokenType || 'Bearer';

        const response = await fetch('http://localhost:8080/api/vehicles', {
          method: 'GET',
          headers: {
            Authorization: `${tokenType} ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }

        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error.message);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="vehicle-list container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">🚘 Available Vehicles</h2>
        <p className="text-muted">Find the perfect vehicle for your next trip.</p>
      </div>

      <div className="row">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />
          ))
        ) : (
          <div className="text-center text-muted">No vehicles available.</div>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
