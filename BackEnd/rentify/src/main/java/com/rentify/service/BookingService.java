package com.rentify.service;

import com.rentify.dto.BookingOwnerViewResponse;
import com.rentify.dto.BookingRequest;
import com.rentify.dto.BookingResponse;
import com.rentify.entity.Booking;
import com.rentify.entity.BookingStatus;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    BookingResponse createBooking(Long userId, BookingRequest request);

    List<BookingResponse> getBookingsByUser(Long userId);

    BookingResponse updateBookingByCustomer(Long userId, Long bookingId, BookingRequest request);

    void deleteBookingByCustomer(Long userId, Long bookingId);

    BookingResponse updateBookingStatusByOwner(Long ownerId, Long bookingId, BookingStatus status);

    List<BookingOwnerViewResponse> getBookingsByOwner(Long ownerId);

   
}
