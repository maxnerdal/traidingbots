package com.tradingbots.controller;

import com.tradingbots.entity.User;
import com.tradingbots.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * UserController - Skyddade endpoints för inloggade användare
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Hämta information om den inloggade användaren
     * 
     * GET /api/user/me
     * Kräver: Valid JWT token
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // Principal är User entity som sattes i JwtRequestFilter
        User user = (User) authentication.getPrincipal();
        
        Map<String, Object> response = new HashMap<>();
        response.put("email", user.getEmail());
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("authorities", authentication.getAuthorities());
        response.put("authenticated", authentication.isAuthenticated());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Update user profile (firstName, lastName)
     * PUT /api/user/profile
     */
    @PutMapping("/profile")
    public ResponseEntity<Map<String, String>> updateProfile(@RequestBody Map<String, String> updates) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        
        try {
            userService.updateProfile(user.getEmail(), updates.get("firstName"), updates.get("lastName"));
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to update profile: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Change password
     * PUT /api/user/password
     */
    @PutMapping("/password")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody Map<String, String> passwordData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        
        try {
            String currentPassword = passwordData.get("currentPassword");
            String newPassword = passwordData.get("newPassword");
            
            userService.changePassword(user.getEmail(), currentPassword, newPassword);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password changed successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Delete account
     * DELETE /api/user/account
     */
    @DeleteMapping("/account")
    public ResponseEntity<Map<String, String>> deleteAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        
        try {
            userService.deleteAccount(user.getEmail());
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Account deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to delete account: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Update theme preference
     * PUT /api/user/theme
     */
    @PutMapping("/theme")
    public ResponseEntity<Map<String, String>> updateTheme(@RequestBody Map<String, String> themeData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        
        try {
            String theme = themeData.get("theme");
            userService.updateTheme(user.getEmail(), theme);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Theme updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to update theme: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
