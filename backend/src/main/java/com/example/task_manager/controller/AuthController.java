package com.example.task_manager.controller;

import com.example.task_manager.model.request.LoginRequest;
import com.example.task_manager.model.request.RegisterRequest;
import com.example.task_manager.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            userService.register(registerRequest);

            // Prepare response as a map and return it as JSON
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Generate the JWT token after successful login
            String jwt = userService.login(loginRequest);

            // Create a response body with the status and token
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", jwt);

            // Return a JSON response with the status and token
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Create a response body with the error message
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login failed: " + e.getMessage());

            // Return a JSON response with the error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Logout endpoint
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout successful. Please clear the token on client side.");
        return ResponseEntity.ok(response);
    }
}