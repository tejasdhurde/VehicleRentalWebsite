import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({});

  const updateBooking = (details) => {
    setBookingDetails(details);
  };

  const selectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <BookingContext.Provider value={{
      selectedVehicle,
      bookingDetails,
      updateBooking,
      selectVehicle
    }}>
      {children}
    </BookingContext.Provider>
  );
};
