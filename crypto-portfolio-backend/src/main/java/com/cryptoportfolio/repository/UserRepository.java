package com.cryptoportfolio.repository;

import com.cryptoportfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * UserRepository - JPA Repository för User entity
 * 
 * Spring Data JPA skapar automatiskt implementationen.
 * Vi behöver endast definiera custom query methods.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Hitta användare via email
     * Spring Data JPA genererar automatiskt SQL:
     * SELECT * FROM users WHERE email = ?
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Kolla om email redan finns
     * Används vid registrering för att förhindra duplicates
     */
    boolean existsByEmail(String email);
}
