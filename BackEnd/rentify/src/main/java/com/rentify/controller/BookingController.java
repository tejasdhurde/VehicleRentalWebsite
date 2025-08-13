package com.rentify.controller;

import com.rentify.dto.BookingOwnerViewResponse;
import com.rentify.dto.BookingRequest;
import com.rentify.dto.BookingResponse;
import com.rentify.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

   
    @PostMapping("/customer/{userId}")
    public ResponseEntity<BookingResponse> createBooking(
            @PathVariable Long userId,
            @RequestBody BookingRequest request) {
        BookingResponse response = bookingService.createBooking(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer/{userId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByCustomer(@PathVariable Long userId) {
        List<BookingResponse> bookings = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(bookings);
    }

    
    @PutMapping("/customer/{userId}/{bookingId}")
    public ResponseEntity<BookingResponse> updateBookingByCustomer(
            @PathVariable Long userId,
            @PathVariable Long bookingId,
            @RequestBody BookingRequest request) {
        BookingResponse response = bookingService.updateBookingByCustomer(userId, bookingId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/customer/{userId}/{bookingId}")
    public ResponseEntity<String> deleteBookingByCustomer(
            @PathVariable Long userId,
            @PathVariable Long bookingId) {
        bookingService.deleteBookingByCustomer(userId, bookingId);
        return ResponseEntity.ok("Booking deleted successfully.");
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<BookingOwnerViewResponse>> getBookingsByOwner(@PathVariable Long ownerId) {
        List<BookingOwnerViewResponse> bookings = bookingService.getBookingsByOwner(ownerId);
        return ResponseEntity.ok(bookings);
    }


   
    @PutMapping("/owner/{ownerId}/{bookingId}")
    public ResponseEntity<BookingResponse> updateBookingStatusByOwner(
            @PathVariable Long ownerId,
            @PathVariable Long bookingId,
            @RequestBody BookingRequest request) {
        if (request.getStatus() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        BookingResponse response = bookingService.updateBookingStatusByOwner(ownerId, bookingId, request.getStatus());
        return ResponseEntity.ok(response);
    }
}
