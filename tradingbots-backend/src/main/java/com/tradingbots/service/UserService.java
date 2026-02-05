package com.tradingbots.service;

import com.tradingbots.entity.User;
import com.tradingbots.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * UserService - Business logic for user management
 */
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Update user profile (firstName, lastName)
     */
    @Transactional
    public void updateProfile(String email, String firstName, String lastName) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (firstName != null && !firstName.trim().isEmpty()) {
            user.setFirstName(firstName);
        }
        if (lastName != null && !lastName.trim().isEmpty()) {
            user.setLastName(lastName);
        }
        
        userRepository.save(user);
    }
    
    /**
     * Change user password
     */
    @Transactional
    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        // Validate new password
        if (newPassword == null || newPassword.length() < 8) {
            throw new RuntimeException("New password must be at least 8 characters");
        }
        
        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
    
    /**
     * Delete user account and all associated data
     */
    @Transactional
    public void deleteAccount(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // TODO: Delete all user's portfolios and items first
        // This should cascade if relationships are properly configured
        
        userRepository.delete(user);
    }
    
    /**
     * Update user's theme preference
     */
    @Transactional
    public void updateTheme(String email, String theme) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (theme == null || (!theme.equals("light") && !theme.equals("dark"))) {
            throw new RuntimeException("Invalid theme. Must be 'light' or 'dark'");
        }
        
        user.setTheme(theme);
        userRepository.save(user);
    }
}
