package com.rentify.service;

import com.rentify.dao.UserRepository;
import com.rentify.dto.UserRegisterRequest;
import com.rentify.dto.UserUpdateRequest; // IMPORTANT: New import
import com.rentify.entity.User;
import com.rentify.exception.UserAlreadyExistsException;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public User registerNewUser(UserRegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + registerRequest.getEmail() + " already exists.");
        }

        User newUser = new User();
        newUser.setName(registerRequest.getName());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setRole(registerRequest.getRole());
        newUser.setPhone(registerRequest.getPhone());
        newUser.setStatus(true);

        return userRepository.save(newUser);
    }

    @Override
    @Transactional
    // IMPORTANT: MODIFIED SIGNATURE AND LOGIC FOR UPDATE
    public User updateUser(Long id, UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));

        // Update fields only if they are provided in the request
        if (userUpdateRequest.getName() != null) {
            user.setName(userUpdateRequest.getName());
        }
        if (userUpdateRequest.getEmail() != null) {
            // Optional: Add logic to prevent changing email if it's already taken
            if (!user.getEmail().equals(userUpdateRequest.getEmail()) && userRepository.findByEmail(userUpdateRequest.getEmail()).isPresent()) {
                throw new UserAlreadyExistsException("Email " + userUpdateRequest.getEmail() + " is already taken by another user.");
            }
            user.setEmail(userUpdateRequest.getEmail());
        }
        // Only update password if it's provided in the DTO and is not empty
        if (userUpdateRequest.getPassword() != null && !userUpdateRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userUpdateRequest.getPassword()));
        }
        if (userUpdateRequest.getRole() != null) {
            // Optional: Add security check to ensure only ADMIN can change roles
            user.setRole(userUpdateRequest.getRole());
        }
        if (userUpdateRequest.getPhone() != null) {
            user.setPhone(userUpdateRequest.getPhone());
        }
        if (userUpdateRequest.getStatus() != null) {
            user.setStatus(userUpdateRequest.getStatus());
        }

        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UsernameNotFoundException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}