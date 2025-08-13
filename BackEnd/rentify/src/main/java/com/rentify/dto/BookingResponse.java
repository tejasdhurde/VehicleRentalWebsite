//package com.rentify.dto;
//
//import java.time.LocalDate;
//
//public class BookingResponse {
//    private Long bookingId;
//    private Long vehicleId;
//    private String vehicleTitle;
//    private LocalDate startDate;
//    private LocalDate endDate;
//    private double totalCost;
//
//    
//    public Long getBookingId() { return bookingId; }
//    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
//
//    public Long getVehicleId() { return vehicleId; }
//    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }
//
//    public String getVehicleTitle() { return vehicleTitle; }
//    public void setVehicleTitle(String vehicleTitle) { this.vehicleTitle = vehicleTitle; }
//
//    public LocalDate getStartDate() { return startDate; }
//    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
//
//    public LocalDate getEndDate() { return endDate; }
//    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
//
//    public double getTotalCost() { return totalCost; }
//    public void setTotalCost(double totalCost) { this.totalCost = totalCost; }
//}

//package com.rentify.dto;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//
//public class BookingResponse {
//
//    private Long bookingId;
//    private Long vehicleId;
//    private String vehicleTitle;
//    private LocalDate startDate;
//    private LocalDate endDate;
//    private BigDecimal totalCost;
//
//    // Getters and Setters
//    public Long getBookingId() {
//        return bookingId;
//    }
//
//    public void setBookingId(Long bookingId) {
//        this.bookingId = bookingId;
//    }
//
//    public Long getVehicleId() {
//        return vehicleId;
//    }
//
//    public void setVehicleId(Long vehicleId) {
//        this.vehicleId = vehicleId;
//    }
//
//    public String getVehicleTitle() {
//        return vehicleTitle;
//    }
//
//    public void setVehicleTitle(String vehicleTitle) {
//        this.vehicleTitle = vehicleTitle;
//    }
//
//    public LocalDate getStartDate() {
//        return startDate;
//    }
//
//    public void setStartDate(LocalDate startDate) {
//        this.startDate = startDate;
//    }
//
//    public LocalDate getEndDate() {
//        return endDate;
//    }
//
//    public void setEndDate(LocalDate endDate) {
//        this.endDate = endDate;
//    }
//
//    public BigDecimal getTotalCost() {
//        return totalCost;
//    }
//
//    public void setTotalCost(BigDecimal totalCost) {
//        this.totalCost = totalCost;
//    }
//}


package com.rentify.dto;

import com.rentify.entity.BookingStatus;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BookingResponse {

    private Long bookingId;
    private Long vehicleId;
    private String vehicleTitle;

    private LocalDate startDate;
    private LocalDate endDate;

    private BigDecimal totalCost;

    private BookingStatus status;


    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getVehicleTitle() {
        return vehicleTitle;
    }

    public void setVehicleTitle(String vehicleTitle) {
        this.vehicleTitle = vehicleTitle;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
