package com.tradingbots.dto;

public class CreateDigitalAssetRequest {
    private String symbol;
    private String name;
    private String coingeckoId;
    
    public CreateDigitalAssetRequest() {}
    
    public CreateDigitalAssetRequest(String symbol, String name, String coingeckoId) {
        this.symbol = symbol;
        this.name = name;
        this.coingeckoId = coingeckoId;
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
}
