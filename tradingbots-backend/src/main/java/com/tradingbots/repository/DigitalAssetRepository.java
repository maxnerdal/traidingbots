package com.tradingbots.repository;

import com.tradingbots.entity.DigitalAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DigitalAssetRepository extends JpaRepository<DigitalAsset, Long> {
    
    Optional<DigitalAsset> findBySymbol(String symbol);
    
    boolean existsBySymbol(String symbol);
}
