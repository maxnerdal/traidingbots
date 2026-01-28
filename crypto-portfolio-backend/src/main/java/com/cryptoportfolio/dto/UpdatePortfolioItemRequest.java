package com.cryptoportfolio.dto;

import java.math.BigDecimal;

public class UpdatePortfolioItemRequest {
    private BigDecimal quantity;
    private BigDecimal averageBuyPrice;
    private String notes;
    
    public UpdatePortfolioItemRequest() {}
    
    public UpdatePortfolioItemRequest(BigDecimal quantity, BigDecimal averageBuyPrice, String notes) {
        this.quantity = quantity;
        this.averageBuyPrice = averageBuyPrice;
        this.notes = notes;
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
