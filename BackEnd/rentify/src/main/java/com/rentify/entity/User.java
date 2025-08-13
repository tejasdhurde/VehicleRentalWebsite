//package com.rentify.entity;
//
//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "users")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long userId;
//
//    private String name;
//
//    @Column(unique = true, nullable = false)
//    private String email;
//
//    private String password;
//
//    @Enumerated(EnumType.STRING)
//    private Role role;
//
//    private String phone;
//
//    private boolean status = true;
//
//    private LocalDateTime createdAt;
//
//    // 🔽 NEW: OTP fields
//    private String otp;
//
//    private LocalDateTime otpExpiryTime;
//
//    @PrePersist
//    public void onCreate() {
//        createdAt = LocalDateTime.now();
//    }
//
//    // Getters and setters
//
//    public Long getUserId() {
//        return userId;
//    }
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public String getName() {
//        return name;
//    }
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public Role getRole() {
//        return role;
//    }
//    public void setRole(Role role) {
//        this.role = role;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public boolean isStatus() {
//        return status;
//    }
//    public void setStatus(boolean status) {
//        this.status = status;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    // 🔽 OTP Getters & Setters
//
//    public String getOtp() {
//        return otp;
//    }
//    public void setOtp(String otp) {
//        this.otp = otp;
//    }
//
//    public LocalDateTime getOtpExpiryTime() {
//        return otpExpiryTime;
//    }
//    public void setOtpExpiryTime(LocalDateTime otpExpiryTime) {
//        this.otpExpiryTime = otpExpiryTime;
//    }
//}
//

package com.rentify.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String phone;

    private boolean status = true;

    private LocalDateTime createdAt;

    // 🔽 NEW: OTP fields
    private String otp;

    private LocalDateTime otpExpiryTime;

    // 🔽 NEW: Bi-directional relationship to Booking
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>();

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and setters

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getOtp() {
        return otp;
    }
    public void setOtp(String otp) {
        this.otp = otp;
    }

    public LocalDateTime getOtpExpiryTime() {
        return otpExpiryTime;
    }
    public void setOtpExpiryTime(LocalDateTime otpExpiryTime) {
        this.otpExpiryTime = otpExpiryTime;
    }

    public List<Booking> getBookings() {
        return bookings;
    }
    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }
}
