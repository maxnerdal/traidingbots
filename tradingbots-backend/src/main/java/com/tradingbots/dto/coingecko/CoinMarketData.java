package com.tradingbots.dto.coingecko;

import com.google.gson.annotations.SerializedName;

/**
 * Response model for CoinGecko market data
 */
public class CoinMarketData {
    
    private String id;
    
    private String symbol;
    
    private String name;
    
    private String image;
    
    @SerializedName("current_price")
    private Double currentPrice;
    
    @SerializedName("market_cap")
    private Long marketCap;
    
    @SerializedName("market_cap_rank")
    private Integer marketCapRank;
    
    @SerializedName("total_volume")
    private Double totalVolume;
    
    @SerializedName("price_change_percentage_24h")
    private Double priceChangePercentage24h;
    
    @SerializedName("last_updated")
    private String lastUpdated;
    
    @SerializedName("circulating_supply")
    private Double circulatingSupply;
    
    @SerializedName("total_supply")
    private Double totalSupply;
    
    @SerializedName("max_supply")
    private Double maxSupply;
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
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
    
    public String getImage() {
        return image;
    }
    
    public void setImage(String image) {
        this.image = image;
    }
    
    public Double getCurrentPrice() {
        return currentPrice;
    }
    
    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }
    
    public Long getMarketCap() {
        return marketCap;
    }
    
    public void setMarketCap(Long marketCap) {
        this.marketCap = marketCap;
    }
    
    public Integer getMarketCapRank() {
        return marketCapRank;
    }
    
    public void setMarketCapRank(Integer marketCapRank) {
        this.marketCapRank = marketCapRank;
    }
    
    public Double getTotalVolume() {
        return totalVolume;
    }
    
    public void setTotalVolume(Double totalVolume) {
        this.totalVolume = totalVolume;
    }
    
    public Double getPriceChangePercentage24h() {
        return priceChangePercentage24h;
    }
    
    public void setPriceChangePercentage24h(Double priceChangePercentage24h) {
        this.priceChangePercentage24h = priceChangePercentage24h;
    }
    
    public String getLastUpdated() {
        return lastUpdated;
    }
    
    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
    
    public Double getCirculatingSupply() {
        return circulatingSupply;
    }
    
    public void setCirculatingSupply(Double circulatingSupply) {
        this.circulatingSupply = circulatingSupply;
    }
    
    public Double getTotalSupply() {
        return totalSupply;
    }
    
    public void setTotalSupply(Double totalSupply) {
        this.totalSupply = totalSupply;
    }
    
    public Double getMaxSupply() {
        return maxSupply;
    }
    
    public void setMaxSupply(Double maxSupply) {
        this.maxSupply = maxSupply;
    }
}
