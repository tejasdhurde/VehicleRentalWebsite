package com.rentify.dto;

import java.time.LocalDateTime;

public class ReviewResponse {
    private Long reviewId;
    private String userName;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewResponse(Long reviewId, String userName, int rating, String comment, LocalDateTime createdAt) {
        this.reviewId = reviewId;
        this.userName = userName;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
    }

	public Long getReviewId() {
		return reviewId;
	}

	public void setReviewId(Long reviewId) {
		this.reviewId = reviewId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

    
}
