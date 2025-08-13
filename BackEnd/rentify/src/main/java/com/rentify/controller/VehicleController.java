package com.rentify.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;

import com.rentify.dto.VehicleRequest;
import com.rentify.dto.VehicleResponse;
import com.rentify.security.CustomUserDetails;
import com.rentify.service.VehicleService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vehicles")
@SecurityRequirement(name = "BearerAuth")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<VehicleResponse> addVehicle(
            @Valid @RequestBody VehicleRequest vehicleRequest,
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        VehicleResponse newVehicle = vehicleService.createVehicle(vehicleRequest, currentUser.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(newVehicle);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER') and @vehicleServiceImpl.getVehicleById(#id).get().ownerId == authentication.principal.userId or hasRole('ADMIN')")
    public ResponseEntity<VehicleResponse> updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequest vehicleRequest) {
        VehicleResponse updatedVehicle = vehicleService.updateVehicle(id, vehicleRequest);
        return ResponseEntity.ok(updatedVehicle);
    }


    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponse> getVehicle(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<VehicleResponse>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @GetMapping("/available")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'OWNER', 'ADMIN')")
    public ResponseEntity<List<VehicleResponse>> getAvailableVehicles() {
        return ResponseEntity.ok(vehicleService.getAvailableVehicles());
    }

    @GetMapping("/owner/{ownerId}")
    
    @PreAuthorize("hasRole('ADMIN') or (#ownerId == authentication.principal.userId)")
    public ResponseEntity<List<VehicleResponse>> getVehiclesByOwnerId(@PathVariable Long ownerId) {
        List<VehicleResponse> vehicles = vehicleService.getVehiclesByOwner(ownerId);
        return ResponseEntity.ok(vehicles);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER') and @vehicleServiceImpl.getVehicleById(#id).get().ownerId == authentication.principal.userId or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

    
    @PostMapping(value = "/{id}/images", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('OWNER') and @vehicleServiceImpl.getVehicleById(#id).get().ownerId == authentication.principal.userId or hasRole('ADMIN')")
    public ResponseEntity<VehicleResponse> uploadVehicleImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        VehicleResponse updatedVehicle = vehicleService.uploadVehicleImage(id, file);
        return ResponseEntity.ok(updatedVehicle);
    }

    
    @DeleteMapping("/{vehicleId}/images/{imageId}")
    @PreAuthorize("hasRole('OWNER') and @vehicleServiceImpl.getVehicleById(#vehicleId).get().ownerId == authentication.principal.userId or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVehicleImage(
            @PathVariable Long vehicleId,
            @PathVariable Long imageId) {
        vehicleService.deleteVehicleImage(vehicleId, imageId);
        return ResponseEntity.noContent().build();
    }
}