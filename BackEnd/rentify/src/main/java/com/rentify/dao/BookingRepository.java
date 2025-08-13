package com.rentify.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rentify.entity.Booking;
import com.rentify.entity.BookingStatus;
import com.rentify.entity.User;
import com.rentify.entity.Vehicle;

import java.util.List;


import java.time.LocalDate;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer(User customer);
    List<Booking> findByVehicle(Vehicle vehicle);
    List<Booking> findAllByVehicleOwnerUserId(Long ownerId);

    List<Booking> findByStatusAndEndDateBefore(BookingStatus status, LocalDate date);
    
    @Query("SELECT b FROM Booking b " +
    	       "WHERE b.vehicle.vehicleId = :vehicleId " +
    	       "AND b.status IN ('CONFIRMED', 'PENDING') " +
    	       "AND (:startDate < b.endDate AND :endDate > b.startDate)")
    	List<Booking> findConflictingBookings(
    	        @Param("vehicleId") Long vehicleId,
    	        @Param("startDate") LocalDate startDate,
    	        @Param("endDate") LocalDate endDate);
    
    
    @Query("SELECT b FROM Booking b " +
    	       "WHERE b.vehicle.vehicleId = :vehicleId " +
    	       "AND b.status = 'CONFIRMED' " +
    	       "AND (:startDate < b.endDate AND :endDate > b.startDate)")
    	List<Booking> findConflictingConfirmedBookings(
    	        @Param("vehicleId") Long vehicleId,
    	        @Param("startDate") LocalDate startDate,
    	        @Param("endDate") LocalDate endDate);

    @Query("SELECT b FROM Booking b " +
    	       "WHERE b.vehicle.vehicleId = :vehicleId " +
    	       "AND b.status = 'PENDING' " +
    	       "AND (:startDate < b.endDate AND :endDate > b.startDate)")
    	List<Booking> findConflictingPendingBookings(
    	        @Param("vehicleId") Long vehicleId,
    	        @Param("startDate") LocalDate startDate,
    	        @Param("endDate") LocalDate endDate);


}
