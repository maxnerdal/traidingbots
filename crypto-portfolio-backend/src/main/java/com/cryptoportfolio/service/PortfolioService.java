package com.cryptoportfolio.service;

import com.cryptoportfolio.dto.AddPortfolioItemRequest;
import com.cryptoportfolio.dto.CreatePortfolioRequest;
import com.cryptoportfolio.dto.UpdatePortfolioItemRequest;
import com.cryptoportfolio.entity.DigitalAsset;
import com.cryptoportfolio.entity.Portfolio;
import com.cryptoportfolio.entity.PortfolioItem;
import com.cryptoportfolio.entity.User;
import com.cryptoportfolio.repository.PortfolioItemRepository;
import com.cryptoportfolio.repository.PortfolioRepository;
import com.cryptoportfolio.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PortfolioService {
    
    private final PortfolioRepository portfolioRepository;
    private final PortfolioItemRepository portfolioItemRepository;
    private final UserRepository userRepository;
    private final DigitalAssetService digitalAssetService;
    
    public PortfolioService(PortfolioRepository portfolioRepository, 
                           PortfolioItemRepository portfolioItemRepository,
                           UserRepository userRepository,
                           DigitalAssetService digitalAssetService) {
        this.portfolioRepository = portfolioRepository;
        this.portfolioItemRepository = portfolioItemRepository;
        this.userRepository = userRepository;
        this.digitalAssetService = digitalAssetService;
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
