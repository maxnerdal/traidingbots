package com.tradingbots.service;

import com.tradingbots.dto.AddPortfolioItemRequest;
import com.tradingbots.dto.CreatePortfolioRequest;
import com.tradingbots.dto.PortfolioItemWithPriceResponse;
import com.tradingbots.dto.UpdatePortfolioItemRequest;
import com.tradingbots.dto.coingecko.SimplePriceResponse;
import com.tradingbots.entity.DigitalAsset;
import com.tradingbots.entity.Portfolio;
import com.tradingbots.entity.PortfolioItem;
import com.tradingbots.entity.User;
import com.tradingbots.repository.PortfolioItemRepository;
import com.tradingbots.repository.PortfolioRepository;
import com.tradingbots.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PortfolioService {
    
    private static final Logger logger = LoggerFactory.getLogger(PortfolioService.class);
    
    private final PortfolioRepository portfolioRepository;
    private final PortfolioItemRepository portfolioItemRepository;
    private final UserRepository userRepository;
    private final DigitalAssetService digitalAssetService;
    private final CoinGeckoService coinGeckoService;
    
    public PortfolioService(PortfolioRepository portfolioRepository, 
                           PortfolioItemRepository portfolioItemRepository,
                           UserRepository userRepository,
                           DigitalAssetService digitalAssetService,
                           CoinGeckoService coinGeckoService) {
        this.portfolioRepository = portfolioRepository;
        this.portfolioItemRepository = portfolioItemRepository;
        this.userRepository = userRepository;
        this.digitalAssetService = digitalAssetService;
        this.coinGeckoService = coinGeckoService;
    }
    
    @Transactional(readOnly = true)
    public List<Portfolio> getUserPortfolios(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }
    
    @Transactional(readOnly = true)
    public Portfolio getPortfolioById(Long id, Long userId) {
        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + id));
        
        if (!portfolio.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to portfolio");
        }
        
        return portfolio;
    }
    
    @Transactional
    public Portfolio createPortfolio(CreatePortfolioRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Portfolio portfolio = new Portfolio();
        portfolio.setUser(user);
        portfolio.setName(request.getName());
        portfolio.setDescription(request.getDescription());
        
        return portfolioRepository.save(portfolio);
    }
    
    @Transactional
    public Portfolio updatePortfolio(Long id, CreatePortfolioRequest request, Long userId) {
        Portfolio portfolio = getPortfolioById(id, userId);
        
        portfolio.setName(request.getName());
        portfolio.setDescription(request.getDescription());
        
        return portfolioRepository.save(portfolio);
    }
    
    @Transactional
    public void deletePortfolio(Long id, Long userId) {
        Portfolio portfolio = getPortfolioById(id, userId);
        portfolioRepository.delete(portfolio);
    }
    
    @Transactional(readOnly = true)
    public List<PortfolioItem> getPortfolioItems(Long portfolioId, Long userId) {
        getPortfolioById(portfolioId, userId); // Verify ownership
        return portfolioItemRepository.findByPortfolioId(portfolioId);
    }
    
    /**
     * Get portfolio items with live prices from CoinGecko
     */
    @Transactional(readOnly = true)
    public List<PortfolioItemWithPriceResponse> getPortfolioItemsWithPrices(Long portfolioId, Long userId) {
        getPortfolioById(portfolioId, userId); // Verify ownership
        List<PortfolioItem> items = portfolioItemRepository.findByPortfolioId(portfolioId);
        
        if (items.isEmpty()) {
            return new ArrayList<>();
        }
        
        // Get unique coingecko IDs from all items
        List<String> coingeckoIds = items.stream()
                .map(item -> item.getDigitalAsset().getCoingeckoId())
                .filter(id -> id != null && !id.isEmpty())
                .distinct()
                .collect(Collectors.toList());
        
        // Fetch prices for all assets at once
        Map<String, SimplePriceResponse.CoinPrice> prices = Map.of();
        LocalDateTime priceUpdateTime = LocalDateTime.now();
        
        if (!coingeckoIds.isEmpty()) {
            try {
                prices = coinGeckoService.getMultiplePrices(coingeckoIds);
                logger.info("Fetched prices for {} assets", prices.size());
            } catch (Exception e) {
                logger.error("Failed to fetch prices from CoinGecko", e);
            }
        }
        
        // Map items to response DTOs with prices
        List<PortfolioItemWithPriceResponse> responses = new ArrayList<>();
        for (PortfolioItem item : items) {
            PortfolioItemWithPriceResponse response = new PortfolioItemWithPriceResponse();
            response.setId(item.getId());
            response.setDigitalAsset(item.getDigitalAsset());
            response.setQuantity(item.getQuantity());
            response.setAverageBuyPrice(item.getAverageBuyPrice());
            response.setNotes(item.getNotes());
            response.setCreatedAt(item.getCreatedAt());
            response.setUpdatedAt(item.getUpdatedAt());
            
            // Set current price if available
            String coingeckoId = item.getDigitalAsset().getCoingeckoId();
            if (coingeckoId != null && prices.containsKey(coingeckoId)) {
                SimplePriceResponse.CoinPrice priceData = prices.get(coingeckoId);
                if (priceData != null && priceData.getUsd() != null) {
                    response.setCurrentPrice(BigDecimal.valueOf(priceData.getUsd()));
                    response.setPriceUpdatedAt(priceUpdateTime);
                }
            }
            
            responses.add(response);
        }
        
        return responses;
    }
    
    @Transactional
    public PortfolioItem addPortfolioItem(Long portfolioId, AddPortfolioItemRequest request, Long userId) {
        Portfolio portfolio = getPortfolioById(portfolioId, userId);
        DigitalAsset asset = digitalAssetService.getAssetById(request.getDigitalAssetId());
        
        // Check if item already exists
        return portfolioItemRepository
                .findByPortfolioIdAndDigitalAssetId(portfolioId, request.getDigitalAssetId())
                .map(existingItem -> {
                    // Update existing item
                    existingItem.setQuantity(existingItem.getQuantity().add(request.getQuantity()));
                    if (request.getAverageBuyPrice() != null) {
                        existingItem.setAverageBuyPrice(request.getAverageBuyPrice());
                    }
                    if (request.getNotes() != null) {
                        existingItem.setNotes(request.getNotes());
                    }
                    return portfolioItemRepository.save(existingItem);
                })
                .orElseGet(() -> {
                    // Create new item
                    PortfolioItem item = new PortfolioItem();
                    item.setPortfolio(portfolio);
                    item.setDigitalAsset(asset);
                    item.setQuantity(request.getQuantity());
                    item.setAverageBuyPrice(request.getAverageBuyPrice());
                    item.setNotes(request.getNotes());
                    return portfolioItemRepository.save(item);
                });
    }
    
    @Transactional
    public PortfolioItem updatePortfolioItem(Long portfolioId, Long itemId, UpdatePortfolioItemRequest request, Long userId) {
        getPortfolioById(portfolioId, userId); // Verify ownership
        
        PortfolioItem item = portfolioItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Portfolio item not found with id: " + itemId));
        
        if (!item.getPortfolio().getId().equals(portfolioId)) {
            throw new RuntimeException("Portfolio item does not belong to this portfolio");
        }
        
        item.setQuantity(request.getQuantity());
        item.setAverageBuyPrice(request.getAverageBuyPrice());
        item.setNotes(request.getNotes());
        
        return portfolioItemRepository.save(item);
    }
    
    @Transactional
    public void deletePortfolioItem(Long portfolioId, Long itemId, Long userId) {
        getPortfolioById(portfolioId, userId); // Verify ownership
        
        PortfolioItem item = portfolioItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Portfolio item not found with id: " + itemId));
        
        if (!item.getPortfolio().getId().equals(portfolioId)) {
            throw new RuntimeException("Portfolio item does not belong to this portfolio");
        }
        
        portfolioItemRepository.delete(item);
    }
}
