package com.rentify.service;

import java.util.List;
import com.rentify.dto.PaymentRequest;
import com.rentify.dto.PaymentResponse;

public interface PaymentService {
    PaymentResponse makePayment(Long userId, Long bookingId, PaymentRequest request);
    List<PaymentResponse> getAllSuccessfulPayments();
}
