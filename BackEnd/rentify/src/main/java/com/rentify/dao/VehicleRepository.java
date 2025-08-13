package com.rentify.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentify.entity.Category;
import com.rentify.entity.User;
import com.rentify.entity.Vehicle;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByOwner(User owner);
    List<Vehicle> findByCategory(Category category);
    List<Vehicle> findByAvailableTrue();
}
