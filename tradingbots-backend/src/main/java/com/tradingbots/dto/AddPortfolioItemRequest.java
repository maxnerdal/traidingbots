package com.tradingbots.dto;

import java.math.BigDecimal;

public class AddPortfolioItemRequest {
    private Long digitalAssetId;
    private BigDecimal quantity;
    private BigDecimal averageBuyPrice;
    private String notes;
    
    public AddPortfolioItemRequest() {}
    
    public AddPortfolioItemRequest(Long digitalAssetId, BigDecimal quantity, BigDecimal averageBuyPrice, String notes) {
        this.digitalAssetId = digitalAssetId;
        this.quantity = quantity;
        this.averageBuyPrice = averageBuyPrice;
        this.notes = notes;
    }
    
    public Long getDigitalAssetId() {
        return digitalAssetId;
    }
    
    public void setDigitalAssetId(Long digitalAssetId) {
        this.digitalAssetId = digitalAssetId;
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
}
