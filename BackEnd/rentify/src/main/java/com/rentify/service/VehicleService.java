package com.rentify.service;

import com.rentify.dto.VehicleRequest;
import com.rentify.dto.VehicleResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface VehicleService {
    VehicleResponse createVehicle(VehicleRequest vehicleRequest, Long ownerId);
    VehicleResponse updateVehicle(Long vehicleId, VehicleRequest vehicleRequest);
    Optional<VehicleResponse> getVehicleById(Long id);
    List<VehicleResponse> getAllVehicles();
    List<VehicleResponse> getAvailableVehicles();
    
    List<VehicleResponse> getVehiclesByOwner(Long ownerId); 
    
    void deleteVehicle(Long id);
    VehicleResponse uploadVehicleImage(Long vehicleId, MultipartFile file);
    void deleteVehicleImage(Long vehicleId, Long imageId);
}