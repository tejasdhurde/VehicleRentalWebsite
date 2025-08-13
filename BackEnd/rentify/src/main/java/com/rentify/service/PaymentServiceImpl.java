package com.rentify.service;

import com.rentify.dao.BookingRepository;
import com.rentify.dao.PaymentRepository;
import com.rentify.dto.PaymentRequest;
import com.rentify.dto.PaymentResponse;
import com.rentify.entity.Booking;
import com.rentify.entity.Payment;
import com.rentify.entity.PaymentStatus;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    @Transactional
    public PaymentResponse makePayment(Long userId, Long bookingId, PaymentRequest request) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getCustomer().getUserId().equals(userId)) {
            throw new SecurityException("Not authorized to make payment for this booking");
        }

        if (paymentRepository.existsByBookingBookingId(bookingId)) {
            throw new RuntimeException("Payment already made for this booking");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(booking.getTotalCost());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setStatus(PaymentStatus.SUCCESS);

        Payment savedPayment = paymentRepository.save(payment);

        PaymentResponse response = new PaymentResponse();
        response.setPaymentId(savedPayment.getPaymentId());
        response.setAmount(savedPayment.getAmount());
        response.setPaymentMethod(savedPayment.getPaymentMethod());
        response.setStatus(savedPayment.getStatus().name());
        response.setPaymentDate(savedPayment.getPaymentDate());
        response.setBookingId(booking.getBookingId());
        response.setVehicleId(booking.getVehicle().getVehicleId());
        response.setVehicleTitle(booking.getVehicle().getTitle());

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllSuccessfulPayments() {
        List<Payment> successfulPayments = paymentRepository.findByStatus(PaymentStatus.SUCCESS);

        return successfulPayments.stream().map(payment -> {
            Booking booking = payment.getBooking();
            PaymentResponse response = new PaymentResponse();
            response.setPaymentId(payment.getPaymentId());
            response.setAmount(payment.getAmount());
            response.setPaymentMethod(payment.getPaymentMethod());
            response.setStatus(payment.getStatus().name());
            response.setPaymentDate(payment.getPaymentDate());
            response.setBookingId(booking.getBookingId());
            response.setVehicleId(booking.getVehicle().getVehicleId());
            response.setVehicleTitle(booking.getVehicle().getTitle());
            return response;
        }).collect(Collectors.toList());
    }
}
