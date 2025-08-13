package com.rentify.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentify.entity.Booking;
import com.rentify.entity.Payment;
import com.rentify.entity.PaymentStatus;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByBooking(Booking booking);
    boolean existsByBookingBookingId(Long bookingId);
    List<Payment> findByStatus(PaymentStatus status);
}
