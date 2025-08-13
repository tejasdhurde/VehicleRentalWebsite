package com.rentify.controller;

import com.rentify.dto.ReviewResponse;
import com.rentify.security.CustomUserDetails;
import com.rentify.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/{vehicleId}")
    public ResponseEntity<String> addReview(@PathVariable Long vehicleId,
                                            @RequestParam int rating,
                                            @RequestParam String comment,
                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
        String message = reviewService.addReview(vehicleId, rating, comment, userDetails);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/{vehicleId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByVehicle(@PathVariable Long vehicleId) {
        List<ReviewResponse> responses = reviewService.getReviewsByVehicle(vehicleId);
        return ResponseEntity.ok(responses);
    }
}
