package com.cryptoportfolio.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio_items", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"portfolio_id", "digital_asset_id"}))
public class PortfolioItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "digital_asset_id", nullable = false)
    private DigitalAsset digitalAsset;
    
    @Column(nullable = false, precision = 20, scale = 8)
    private BigDecimal quantity; // Amount of this asset
    
    @Column(name = "average_buy_price", precision = 20, scale = 2)
    private BigDecimal averageBuyPrice; // Average price paid (optional)
    
    @Column(length = 500)
    private String notes; // Optional notes
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    public PortfolioItem() {}
    
    public PortfolioItem(Long id, Portfolio portfolio, DigitalAsset digitalAsset, BigDecimal quantity, BigDecimal averageBuyPrice, String notes) {
        this.id = id;
        this.portfolio = portfolio;
        this.digitalAsset = digitalAsset;
        this.quantity = quantity;
        this.averageBuyPrice = averageBuyPrice;
        this.notes = notes;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Portfolio getPortfolio() {
        return portfolio;
    }
    
    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
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
}
