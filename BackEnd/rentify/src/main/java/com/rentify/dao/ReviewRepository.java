package com.rentify.dao;

import com.rentify.entity.Review;
import com.rentify.entity.User;
import com.rentify.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByCustomer(User customer);

    @Query("SELECT r FROM Review r JOIN FETCH r.customer WHERE r.vehicle = :vehicle")
    List<Review> findByVehicleWithCustomer(Vehicle vehicle);
}
