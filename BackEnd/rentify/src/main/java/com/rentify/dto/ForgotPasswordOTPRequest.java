package com.rentify.dto;

import jakarta.validation.constraints.Email;


public class ForgotPasswordOTPRequest {
    @Email
    private String email;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
}
