package com.tradingbots.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "digital_assets")
public class DigitalAsset {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 20)
    private String symbol; // BTC, ETH, etc.
    
    @Column(nullable = false, length = 100)
    private String name; // Bitcoin, Ethereum, etc.
    
    @Column(name = "coingecko_id", length = 100)
    private String coingeckoId; // For API integration later
    
    @Column(name = "icon_url", length = 255)
    private String iconUrl; // Icon/logo URL from CoinGecko
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    public DigitalAsset() {}
    
    public DigitalAsset(Long id, String symbol, String name, String coingeckoId) {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.coingeckoId = coingeckoId;
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
    
    public String getSymbol() {
        return symbol;
    }
    
    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCoingeckoId() {
        return coingeckoId;
    }
    
    public void setCoingeckoId(String coingeckoId) {
        this.coingeckoId = coingeckoId;
    }
    
    public String getIconUrl() {
        return iconUrl;
    }
    
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
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
