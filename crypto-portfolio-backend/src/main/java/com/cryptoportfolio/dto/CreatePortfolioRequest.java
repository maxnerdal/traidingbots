package com.cryptoportfolio.dto;

public class CreatePortfolioRequest {
    private String name;
    private String description;
    
    public CreatePortfolioRequest() {}
    
    public CreatePortfolioRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
}
