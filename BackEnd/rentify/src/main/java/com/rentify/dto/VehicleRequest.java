package com.rentify.dto;

import com.rentify.entity.Category;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.math.BigDecimal;

public class VehicleRequest {

    // No @NotNull for ownerId here if it's derived from the authenticated user.
    // However, if an Admin needs to assign an owner, then it could be included.
    // For now, let's assume the owner is the authenticated user creating/updating it.
    // If you need to allow an Admin to set an owner:
    // @NotNull(message = "Owner ID is required")
    // private Long ownerId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Category is required")
    private Category category;

    @NotNull(message = "Price per day is required")
    @DecimalMin(value = "0.01", message = "Price per day must be greater than 0")
    private BigDecimal pricePerDay;

    @NotBlank(message = "Fuel type is required")
    private String fuelType;

    @Min(value = 1, message = "Seating capacity must be at least 1")
    private int seatingCapacity;

    private String description;

    // For updating, available status might be changed
    private Boolean available; // Use Boolean to allow null for partial updates

    @NotBlank(message = "Location is required")
    private String location;

    // Getters and Setters
    // public Long getOwnerId() { return ownerId; }
    // public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
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
    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}