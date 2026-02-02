package com.tradingbots.repository;

import com.tradingbots.entity.PortfolioItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PortfolioItemRepository extends JpaRepository<PortfolioItem, Long> {
    
    List<PortfolioItem> findByPortfolioId(Long portfolioId);
    
    Optional<PortfolioItem> findByPortfolioIdAndDigitalAssetId(Long portfolioId, Long digitalAssetId);
}
