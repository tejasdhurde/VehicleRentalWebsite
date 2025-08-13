

package com.rentify.service;

import com.rentify.dto.UserRegisterRequest;
import com.rentify.dto.UserUpdateRequest;
import com.rentify.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerNewUser(UserRegisterRequest registerRequest);
    User updateUser(Long id, UserUpdateRequest userUpdateRequest);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    List<User> getAllUsers();
    void deleteUser(Long id);
    void resetPassword(String email, String newPassword);

    void generateAndSendOtp(String email);
    boolean verifyOtpAndResetPassword(String email, String otp, String newPassword);
}
