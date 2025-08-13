package com.rentify.controller;

import com.rentify.dto.UserResponse;
import com.rentify.dto.UserUpdateRequest; // NEW IMPORT for update DTO
import com.rentify.entity.User;
import com.rentify.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid; // NEW IMPORT for @Valid
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
@SecurityRequirement(name = "BearerAuth") // Apply security to all methods in this controller
public class UserController {

    @Autowired
    private UserService userService;

    
    @PutMapping("/{id}")
    
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.userId")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest userUpdateRequest) { // Use UserUpdateRequest DTO
        User updatedUserEntity = userService.updateUser(id, userUpdateRequest);
        return ResponseEntity.ok(convertToUserResponse(updatedUserEntity));
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.userId")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(convertToUserResponse(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserResponse> userResponses = users.stream()
                                                .map(this::convertToUserResponse)
                                                .collect(Collectors.toList());
        return ResponseEntity.ok(userResponses);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.userId")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    private UserResponse convertToUserResponse(User user) {
        return new UserResponse(
            user.getUserId(),
            user.getName(),
            user.getEmail(),
            user.getRole(),
            user.getPhone(),
            user.isStatus(),
            user.getCreatedAt()
        );
    }
}