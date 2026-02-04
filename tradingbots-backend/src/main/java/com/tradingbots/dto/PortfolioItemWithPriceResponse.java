package com.tradingbots.dto;

import com.tradingbots.entity.DigitalAsset;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Response DTO for Portfolio Item with current price data
 */
public class PortfolioItemWithPriceResponse {
    
    private Long id;
    private DigitalAsset digitalAsset;
    private BigDecimal quantity;
    private BigDecimal averageBuyPrice;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Live price data
    private BigDecimal currentPrice;
    private LocalDateTime priceUpdatedAt;
    
    public PortfolioItemWithPriceResponse() {}
    
    public PortfolioItemWithPriceResponse(Long id, DigitalAsset digitalAsset, BigDecimal quantity, 
                                         BigDecimal averageBuyPrice, String notes, 
                                         LocalDateTime createdAt, LocalDateTime updatedAt,
                                         BigDecimal currentPrice, LocalDateTime priceUpdatedAt) {
        this.id = id;
        this.digitalAsset = digitalAsset;
        this.quantity = quantity;
        this.averageBuyPrice = averageBuyPrice;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.currentPrice = currentPrice;
        this.priceUpdatedAt = priceUpdatedAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public DigitalAsset getDigitalAsset() {
        return digitalAsset;
    }
    
    public void setDigitalAsset(DigitalAsset digitalAsset) {
        this.digitalAsset = digitalAsset;
    }
    
    public BigDecimal getQuantity() {
        return quantity;
    }
    
    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }
    
    public BigDecimal getAverageBuyPrice() {
        return averageBuyPrice;
    }
    
    public void setAverageBuyPrice(BigDecimal averageBuyPrice) {
        this.averageBuyPrice = averageBuyPrice;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }
    
    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }
    
    public LocalDateTime getPriceUpdatedAt() {
        return priceUpdatedAt;
    }
    
    public void setPriceUpdatedAt(LocalDateTime priceUpdatedAt) {
        this.priceUpdatedAt = priceUpdatedAt;
    }
}
