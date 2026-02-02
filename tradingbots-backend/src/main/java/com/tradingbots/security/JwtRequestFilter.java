package com.tradingbots.security;

import com.tradingbots.entity.User;
import com.tradingbots.repository.UserRepository;
import com.tradingbots.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.stream.Collectors;

/**
 * JwtRequestFilter - Interceptar alla HTTP requests och validerar JWT token
 * 
 * Detta filter körs före varje request för att:
 * 1. Extrahera JWT token från Authorization header
 * 2. Validera token
 * 3. Sätta authentication i Security Context
 */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    
    public JwtRequestFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) 
            throws ServletException, IOException {
        
        final String authorizationHeader = request.getHeader("Authorization");
        
        String email = null;
        String jwt = null;
        
        // Extrahera token från "Bearer <token>" header
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            email = jwtUtil.extractEmail(jwt);
        }
        
        // Om token finns och ingen authentication redan är satt
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
            
            // Validera token
            if (jwtUtil.validateToken(jwt, userDetails)) {
                // Hämta den faktiska User entity från databasen
                User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                
                // Skapa authentication med User entity som principal
                UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(
                                user, // Använd User entity istället för UserDetails
                                null, 
                                user.getRoles().stream()
                                    .map(role -> new SimpleGrantedAuthority(role.name()))
                                    .collect(Collectors.toList()));
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Sätt authentication i Security Context
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
