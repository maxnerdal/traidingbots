package com.tradingbots.service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.tradingbots.config.CoinGeckoConfig;
import com.tradingbots.dto.coingecko.CoinMarketData;
import com.tradingbots.dto.coingecko.SimplePriceResponse;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Service for interacting with CoinGecko API
 */
@Service
public class CoinGeckoService {
    
    private static final Logger logger = LoggerFactory.getLogger(CoinGeckoService.class);
    
    private final OkHttpClient httpClient;
    private final CoinGeckoConfig config;
    private final Gson gson;
    
    public CoinGeckoService(OkHttpClient coinGeckoHttpClient, CoinGeckoConfig config) {
        this.httpClient = coinGeckoHttpClient;
        this.config = config;
        this.gson = new Gson();
    }
    
    /**
     * Get top cryptocurrencies by market cap
     * 
     * @param limit Number of cryptocurrencies to fetch (default 100)
     * @param page Page number (default 1)
     * @return List of coin market data
     */
    public List<CoinMarketData> getTopCryptos(int limit, int page) {
        String url = String.format("%s/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=%d&page=%d&sparkline=false&price_change_percentage=24h",
                config.getBaseUrl(), limit, page);
        
        try {
            Request.Builder requestBuilder = new Request.Builder()
                    .url(url)
                    .get();
            
            // Add API key header for demo tier
            if (config.getApiKey() != null && !config.getApiKey().isEmpty()) {
                requestBuilder.addHeader("x-cg-demo-api-key", config.getApiKey());
            }
            
            Request request = requestBuilder.build();
            
            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.error("Failed to fetch top cryptos. Status: {}, Message: {}", 
                            response.code(), response.message());
                    
                    if (response.code() == 429) {
                        logger.warn("Rate limit exceeded. Please wait before making more requests.");
                    }
                    
                    return new ArrayList<>();
                }
                
                String responseBody = response.body().string();
                logger.debug("CoinGecko response: {}", responseBody.substring(0, Math.min(500, responseBody.length())));
                
                Type listType = new TypeToken<List<CoinMarketData>>(){}.getType();
                List<CoinMarketData> marketData = gson.fromJson(responseBody, listType);
                
                logger.info("Successfully fetched {} cryptocurrencies", marketData.size());
                return marketData;
            }
            
        } catch (IOException e) {
            logger.error("Error fetching top cryptocurrencies", e);
            return new ArrayList<>();
        }
    }
    
    /**
     * Get current price for a specific cryptocurrency
     * 
     * @param coinId CoinGecko coin ID (e.g., "bitcoin", "ethereum")
     * @return Price data or null if not found
     */
    public SimplePriceResponse.CoinPrice getCoinPrice(String coinId) {
        String url = String.format("%s/simple/price?ids=%s&vs_currencies=usd&include_24hr_change=true",
                config.getBaseUrl(), coinId);
        
        try {
            Request.Builder requestBuilder = new Request.Builder()
                    .url(url)
                    .get();
            
            // Add API key header for demo tier
            if (config.getApiKey() != null && !config.getApiKey().isEmpty()) {
                requestBuilder.addHeader("x-cg-demo-api-key", config.getApiKey());
            }
            
            Request request = requestBuilder.build();
            
            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.error("Failed to fetch price for {}. Status: {}", coinId, response.code());
                    return null;
                }
                
                String responseBody = response.body().string();
                Type mapType = new TypeToken<Map<String, SimplePriceResponse.CoinPrice>>(){}.getType();
                Map<String, SimplePriceResponse.CoinPrice> priceMap = gson.fromJson(responseBody, mapType);
                
                return priceMap.get(coinId);
            }
            
        } catch (IOException e) {
            logger.error("Error fetching price for {}", coinId, e);
            return null;
        }
    }
    
    /**
     * Get prices for multiple cryptocurrencies
     * 
     * @param coinIds List of CoinGecko coin IDs
     * @return Map of coin ID to price data
     */
    public Map<String, SimplePriceResponse.CoinPrice> getMultiplePrices(List<String> coinIds) {
        String ids = String.join(",", coinIds);
        String url = String.format("%s/simple/price?ids=%s&vs_currencies=usd&include_24hr_change=true",
                config.getBaseUrl(), ids);
        
        try {
            Request.Builder requestBuilder = new Request.Builder()
                    .url(url)
                    .get();
            
            // Add API key header for demo tier
            if (config.getApiKey() != null && !config.getApiKey().isEmpty()) {
                requestBuilder.addHeader("x-cg-demo-api-key", config.getApiKey());
            }
            
            Request request = requestBuilder.build();
            
            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.error("Failed to fetch multiple prices. Status: {}", response.code());
                    return Map.of();
                }
                
                String responseBody = response.body().string();
                Type mapType = new TypeToken<Map<String, SimplePriceResponse.CoinPrice>>(){}.getType();
                Map<String, SimplePriceResponse.CoinPrice> priceMap = gson.fromJson(responseBody, mapType);
                
                logger.info("Successfully fetched prices for {} coins", priceMap.size());
                return priceMap;
            }
            
        } catch (IOException e) {
            logger.error("Error fetching multiple prices", e);
            return Map.of();
        }
    }
    
    /**
     * Search for a cryptocurrency by name or symbol
     * 
     * @param query Search query
     * @return List of matching coins
     */
    public List<CoinMarketData> searchCoins(String query) {
        String url = String.format("%s/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false",
                config.getBaseUrl());
        
        try {
            Request.Builder requestBuilder = new Request.Builder()
                    .url(url)
                    .get();
            
            // Add API key header for demo tier
            if (config.getApiKey() != null && !config.getApiKey().isEmpty()) {
                requestBuilder.addHeader("x-cg-demo-api-key", config.getApiKey());
            }
            
            Request request = requestBuilder.build();
            
            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.error("Failed to search coins. Status: {}", response.code());
                    return new ArrayList<>();
                }
                
                String responseBody = response.body().string();
                Type listType = new TypeToken<List<CoinMarketData>>(){}.getType();
                List<CoinMarketData> allCoins = gson.fromJson(responseBody, listType);
                
                // Filter coins based on query
                String lowerQuery = query.toLowerCase();
                List<CoinMarketData> filtered = allCoins.stream()
                        .filter(coin -> coin.getName().toLowerCase().contains(lowerQuery) 
                                || coin.getSymbol().toLowerCase().contains(lowerQuery)
                                || coin.getId().toLowerCase().contains(lowerQuery))
                        .limit(50)
                        .toList();
                
                logger.info("Found {} coins matching '{}'", filtered.size(), query);
                return filtered;
            }
            
        } catch (IOException e) {
            logger.error("Error searching coins", e);
            return new ArrayList<>();
        }
    }
}
