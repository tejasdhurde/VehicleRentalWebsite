package com.rentify.dto;

import jakarta.validation.constraints.NotBlank;


public class VerifyOtpResetPasswordRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String otp;
    @NotBlank
    private String newPassword;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
    
    
}
