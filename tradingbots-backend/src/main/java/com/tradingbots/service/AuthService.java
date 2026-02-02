package com.tradingbots.service;

import com.tradingbots.dto.AuthResponse;
import com.tradingbots.dto.LoginRequest;
import com.tradingbots.dto.RegisterRequest;
import com.tradingbots.entity.Role;
import com.tradingbots.entity.User;
import com.tradingbots.repository.UserRepository;
import com.tradingbots.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

/**
 * AuthService - Business logic för autentisering
 * 
 * Hanterar:
 * - User registration
 * - User login
 * - JWT token generation
 */
@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, 
                      JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }
    
    /**
     * Registrera ny användare
     * 
     * @param request RegisterRequest med email, password, etc.
     * @return AuthResponse med JWT token
     * @throws RuntimeException om email redan finns
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Kolla om email redan finns
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        
        // Skapa ny användare
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.addRole(Role.ROLE_USER); // Default role
        user.setEnabled(true);
        
        // Spara till databas
        user = userRepository.save(user);
        
        // Generera JWT token
        String token = jwtUtil.generateToken(user.getEmail());
        
        // Returnera response
        return new AuthResponse(
                token,
                user.getEmail(),
                user.getRoles().stream()
                        .map(Role::name)
                        .collect(Collectors.toSet())
        );
    }
    
    /**
     * Logga in användare
     * 
     * @param request LoginRequest med email och password
     * @return AuthResponse med JWT token
     * @throws RuntimeException om credentials är fel
     */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        // Autentisera med Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        // Hämta användare från databas
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Generera JWT token
        String token = jwtUtil.generateToken(user.getEmail());
        
        // Returnera response
        return new AuthResponse(
                token,
                user.getEmail(),
                user.getRoles().stream()
                        .map(Role::name)
                        .collect(Collectors.toSet())
        );
    }
}
