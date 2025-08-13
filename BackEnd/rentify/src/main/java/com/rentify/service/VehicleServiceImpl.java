package com.rentify.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.rentify.dao.UserRepository;
import com.rentify.dao.VehicleImageRepository;
import com.rentify.dao.VehicleRepository;
import com.rentify.dto.VehicleImageResponse;
import com.rentify.dto.VehicleRequest;
import com.rentify.dto.VehicleResponse;
import com.rentify.entity.User;
import com.rentify.entity.Vehicle;
import com.rentify.entity.VehicleImage;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleImageRepository vehicleImageRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    private VehicleResponse convertToVehicleResponse(Vehicle vehicle) {
        List<VehicleImageResponse> imageResponses = vehicle.getImages().stream()
                                                            .map(img -> new VehicleImageResponse(img.getImageId(), img.getImageUrl()))
                                                            .collect(Collectors.toList());

        return new VehicleResponse(
                vehicle.getVehicleId(),
                vehicle.getOwner().getUserId(),
                vehicle.getOwner().getName(),
                vehicle.getTitle(),
                vehicle.getCategory(),
                vehicle.getPricePerDay(),
                vehicle.getFuelType(),
                vehicle.getSeatingCapacity(),
                vehicle.getDescription(),
                vehicle.isAvailable(),
                vehicle.getLocation(),
                vehicle.getCreatedAt(),
                imageResponses
        );
    }

    private List<VehicleResponse> convertToVehicleResponseList(List<Vehicle> vehicles) {
        return vehicles.stream()
                       .map(this::convertToVehicleResponse)
                       .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public VehicleResponse createVehicle(VehicleRequest vehicleRequest, Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new UsernameNotFoundException("Owner not found with ID: " + ownerId));

        Vehicle vehicle = new Vehicle();
        vehicle.setOwner(owner);
        vehicle.setTitle(vehicleRequest.getTitle());
        vehicle.setCategory(vehicleRequest.getCategory());
        vehicle.setPricePerDay(vehicleRequest.getPricePerDay());
        vehicle.setFuelType(vehicleRequest.getFuelType());
        vehicle.setSeatingCapacity(vehicleRequest.getSeatingCapacity());
        vehicle.setDescription(vehicleRequest.getDescription());
        vehicle.setAvailable(vehicleRequest.getAvailable() != null ? vehicleRequest.getAvailable() : true);
        vehicle.setLocation(vehicleRequest.getLocation());

        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return convertToVehicleResponse(savedVehicle);
    }

    @Override
    @Transactional
    public VehicleResponse updateVehicle(Long vehicleId, VehicleRequest vehicleRequest) {
        Vehicle existingVehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new UsernameNotFoundException("Vehicle not found with ID: " + vehicleId));

        if (vehicleRequest.getTitle() != null) {
            existingVehicle.setTitle(vehicleRequest.getTitle());
        }
        if (vehicleRequest.getCategory() != null) {
            existingVehicle.setCategory(vehicleRequest.getCategory());
        }
        if (vehicleRequest.getPricePerDay() != null) {
            existingVehicle.setPricePerDay(vehicleRequest.getPricePerDay());
        }
        if (vehicleRequest.getFuelType() != null) {
            existingVehicle.setFuelType(vehicleRequest.getFuelType());
        }
        if (vehicleRequest.getSeatingCapacity() > 0) {
            existingVehicle.setSeatingCapacity(vehicleRequest.getSeatingCapacity());
        }
        if (vehicleRequest.getDescription() != null) {
            existingVehicle.setDescription(vehicleRequest.getDescription());
        }
        if (vehicleRequest.getAvailable() != null) {
            existingVehicle.setAvailable(vehicleRequest.getAvailable());
        }
        if (vehicleRequest.getLocation() != null) {
            existingVehicle.setLocation(vehicleRequest.getLocation());
        }

        Vehicle updatedVehicle = vehicleRepository.save(existingVehicle);
        return convertToVehicleResponse(updatedVehicle);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VehicleResponse> getVehicleById(Long id) {
        return vehicleRepository.findById(id).map(this::convertToVehicleResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleResponse> getAllVehicles() {
        return convertToVehicleResponseList(vehicleRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleResponse> getAvailableVehicles() {
        return convertToVehicleResponseList(vehicleRepository.findByAvailableTrue());
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleResponse> getVehiclesByOwner(Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new UsernameNotFoundException("Owner not found with ID: " + ownerId));
        return convertToVehicleResponseList(vehicleRepository.findByOwner(owner));
    }

    @Override
    @Transactional
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new UsernameNotFoundException("Vehicle not found with ID: " + id);
        }
        vehicleRepository.deleteById(id);
    }
    
    @Override
    @Transactional
    public VehicleResponse uploadVehicleImage(Long vehicleId, MultipartFile file) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new UsernameNotFoundException("Vehicle not found with ID: " + vehicleId));

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload empty file.");
        }

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID().toString() + fileExtension;
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            VehicleImage vehicleImage = new VehicleImage();
            vehicleImage.setVehicle(vehicle);
            vehicleImage.setImageUrl("/uploads/" + fileName);

            vehicle.addImage(vehicleImage);

            Vehicle savedVehicle = vehicleRepository.save(vehicle);

            return convertToVehicleResponse(savedVehicle);

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + file.getOriginalFilename() + ". Please try again!", ex);
        }
    }

    @Override
    @Transactional
    public void deleteVehicleImage(Long vehicleId, Long imageId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new UsernameNotFoundException("Vehicle not found with ID: " + vehicleId));

        VehicleImage imageToDelete = vehicleImageRepository.findById(imageId)
                .orElseThrow(() -> new UsernameNotFoundException("Image not found with ID: " + imageId));

        if (!imageToDelete.getVehicle().equals(vehicle)) {
            throw new IllegalArgumentException("Image does not belong to the specified vehicle.");
        }

        try {
            Path filePath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(imageToDelete.getImageUrl().replace("/uploads/", ""));
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            System.err.println("Failed to delete physical image file: " + e.getMessage());
        }

        vehicle.removeImage(imageToDelete);
        vehicleImageRepository.delete(imageToDelete);
    }
}