package com.tradingbots.controller;

import com.tradingbots.dto.AddPortfolioItemRequest;
import com.tradingbots.dto.CreatePortfolioRequest;
import com.tradingbots.dto.UpdatePortfolioItemRequest;
import com.tradingbots.entity.Portfolio;
import com.tradingbots.entity.PortfolioItem;
import com.tradingbots.entity.User;
import com.tradingbots.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {
    
    private final PortfolioService portfolioService;
    
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }
    
    @GetMapping
    public ResponseEntity<List<Portfolio>> getUserPortfolios(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.getUserPortfolios(user.getId()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getPortfolio(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.getPortfolioById(id, user.getId()));
    }
    
    @PostMapping
    public ResponseEntity<Portfolio> createPortfolio(
            @RequestBody CreatePortfolioRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.createPortfolio(request, user.getId()));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Portfolio> updatePortfolio(
            @PathVariable Long id,
            @RequestBody CreatePortfolioRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.updatePortfolio(id, request, user.getId()));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id, @AuthenticationPrincipal User user) {
        portfolioService.deletePortfolio(id, user.getId());
        return ResponseEntity.noContent().build();
    }
    
    // Portfolio Items endpoints
    
    @GetMapping("/{portfolioId}/items")
    public ResponseEntity<List<PortfolioItem>> getPortfolioItems(
            @PathVariable Long portfolioId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.getPortfolioItems(portfolioId, user.getId()));
    }
    
    @PostMapping("/{portfolioId}/items")
    public ResponseEntity<PortfolioItem> addPortfolioItem(
            @PathVariable Long portfolioId,
            @RequestBody AddPortfolioItemRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.addPortfolioItem(portfolioId, request, user.getId()));
    }
    
    @PutMapping("/{portfolioId}/items/{itemId}")
    public ResponseEntity<PortfolioItem> updatePortfolioItem(
            @PathVariable Long portfolioId,
            @PathVariable Long itemId,
            @RequestBody UpdatePortfolioItemRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(portfolioService.updatePortfolioItem(portfolioId, itemId, request, user.getId()));
    }
    
    @DeleteMapping("/{portfolioId}/items/{itemId}")
    public ResponseEntity<Void> deletePortfolioItem(
            @PathVariable Long portfolioId,
            @PathVariable Long itemId,
            @AuthenticationPrincipal User user) {
        portfolioService.deletePortfolioItem(portfolioId, itemId, user.getId());
        return ResponseEntity.noContent().build();
    }
}
