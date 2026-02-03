package com.tradingbots.dto.coingecko;

import com.google.gson.annotations.SerializedName;

import java.util.Map;

/**
 * Response model for CoinGecko simple price endpoint
 */
public class SimplePriceResponse {
    
    private Double usd;
    
    @SerializedName("usd_24h_change")
    private Double usd24hChange;
    
    public Double getUsd() {
        return usd;
    }
    
    public void setUsd(Double usd) {
        this.usd = usd;
    }
    
    public Double getUsd24hChange() {
        return usd24hChange;
    }
    
    public void setUsd24hChange(Double usd24hChange) {
        this.usd24hChange = usd24hChange;
    }
    
    // For handling dynamic response keys like {"bitcoin": {"usd": 50000}}
    public static class CoinPrice {
        private Double usd;
        
        @SerializedName("usd_24h_change")
        private Double usd24hChange;
        
        public Double getUsd() {
            return usd;
        }
        
        public void setUsd(Double usd) {
            this.usd = usd;
        }
        
        public Double getUsd24hChange() {
            return usd24hChange;
        }
        
        public void setUsd24hChange(Double usd24hChange) {
            this.usd24hChange = usd24hChange;
        }
    }
}
