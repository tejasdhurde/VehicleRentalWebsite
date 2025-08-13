package com.rentify.service;

import com.rentify.dao.ReviewRepository;
import com.rentify.dao.UserRepository;
import com.rentify.dao.VehicleRepository;
import com.rentify.dto.ReviewResponse;
import com.rentify.entity.Review;
import com.rentify.entity.User;
import com.rentify.entity.Vehicle;
import com.rentify.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    public String addReview(Long vehicleId, int rating, String comment, CustomUserDetails userDetails) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + vehicleId));

        User customer = userRepository.findById(userDetails.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userDetails.getUserId()));

        Review review = new Review();
        review.setVehicle(vehicle);
        review.setCustomer(customer);
        review.setRating(rating);
        review.setComment(comment);
        review.setCreatedAt(LocalDateTime.now());

        reviewRepository.save(review);
        return "Review submitted successfully.";
    }

    public List<ReviewResponse> getReviewsByVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + vehicleId));

        List<Review> reviews = reviewRepository.findByVehicleWithCustomer(vehicle);

        return reviews.stream()
                .map(review -> new ReviewResponse(
                        review.getReviewId(),
                        review.getCustomer().getName(),
                        review.getRating(),
                        review.getComment(),
                        review.getCreatedAt()
                )).toList();
    }
}
