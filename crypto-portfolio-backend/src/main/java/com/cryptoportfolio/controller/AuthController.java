package com.cryptoportfolio.controller;

import com.cryptoportfolio.dto.AuthResponse;
import com.cryptoportfolio.dto.LoginRequest;
import com.cryptoportfolio.dto.RegisterRequest;
import com.cryptoportfolio.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController - REST endpoints för autentisering
 * 
 * Endpoints:
 * POST /api/auth/register - Registrera ny användare
 * POST /api/auth/login    - Logga in användare
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    /**
     * Registrera ny användare
     * 
     * POST /api/auth/register
     * Body: { "email": "user@example.com", "password": "password123", "firstName": "John", "lastName": "Doe" }
     * 
     * @return JWT token och användarinfo
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Logga in användare
     * 
     * POST /api/auth/login
     * Body: { "email": "user@example.com", "password": "password123" }
     * 
     * @return JWT token och användarinfo
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
