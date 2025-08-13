package com.rentify.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentify.entity.Vehicle;
import com.rentify.entity.VehicleImage;

public interface VehicleImageRepository extends JpaRepository<VehicleImage, Long> {
    List<VehicleImage> findByVehicle(Vehicle vehicle);
}
