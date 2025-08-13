package com.rentify.dto;

import com.rentify.entity.Category;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List; // For images

public class VehicleResponse {
    private Long vehicleId;
    private Long ownerId; // Just the owner's ID
    private String ownerName; // Include owner's name for convenience
    private String title;
    private Category category;
    private BigDecimal pricePerDay;
    private String fuelType;
    private int seatingCapacity;
    private String description;
    private boolean available;
    private String location;
    private LocalDateTime createdAt;
    private List<VehicleImageResponse> images; // List of associated image DTOs

    // Constructor to map from Vehicle entity
    public VehicleResponse(Long vehicleId, Long ownerId, String ownerName, String title, Category category,
                           BigDecimal pricePerDay, String fuelType, int seatingCapacity,
                           String description, boolean available, String location,
                           LocalDateTime createdAt, List<VehicleImageResponse> images) {
        this.vehicleId = vehicleId;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.title = title;
        this.category = category;
        this.pricePerDay = pricePerDay;
        this.fuelType = fuelType;
        this.seatingCapacity = seatingCapacity;
        this.description = description;
        this.available = available;
        this.location = location;
        this.createdAt = createdAt;
        this.images = images;
    }

    // Getters and Setters
    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public BigDecimal getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; }
    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }
    public int getSeatingCapacity() { return seatingCapacity; }
    public void setSeatingCapacity(int seatingCapacity) { this.seatingCapacity = seatingCapacity; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<VehicleImageResponse> getImages() { return images; }
    public void setImages(List<VehicleImageResponse> images) { this.images = images; }
}