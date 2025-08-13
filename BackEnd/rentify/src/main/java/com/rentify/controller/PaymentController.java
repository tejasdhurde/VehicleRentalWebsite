package com.rentify.controller;

import com.rentify.dto.PaymentRequest;
import com.rentify.dto.PaymentResponse;
import com.rentify.service.PaymentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/customer/{userId}/{bookingId}")
    public ResponseEntity<PaymentResponse> makePayment(
            @PathVariable Long userId,
            @PathVariable Long bookingId,
            @RequestBody PaymentRequest request) {

        PaymentResponse payment = paymentService.makePayment(userId, bookingId, request);
        return ResponseEntity.ok(payment);
    }

    @GetMapping("/successful")
    public ResponseEntity<List<PaymentResponse>> getSuccessfulPayments() {
        List<PaymentResponse> payments = paymentService.getAllSuccessfulPayments();
        return ResponseEntity.ok(payments);
    }
}
