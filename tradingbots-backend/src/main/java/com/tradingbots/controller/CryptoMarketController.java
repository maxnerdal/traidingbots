package com.tradingbots.controller;

import com.tradingbots.dto.coingecko.CoinMarketData;
import com.tradingbots.dto.coingecko.SimplePriceResponse;
import com.tradingbots.service.CoinGeckoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for CoinGecko API endpoints
 */
@RestController
@RequestMapping("/api/crypto")
@CrossOrigin(origins = "http://localhost:5173")
public class CryptoMarketController {
    
    private final CoinGeckoService coinGeckoService;
    
    public CryptoMarketController(CoinGeckoService coinGeckoService) {
        this.coinGeckoService = coinGeckoService;
    }
    
    /**
     * Get top cryptocurrencies by market cap
     * 
     * @param limit Number of cryptocurrencies to fetch (default 100)
     * @param page Page number (default 1)
     * @return List of coin market data
     */
    @GetMapping("/top")
    public ResponseEntity<List<CoinMarketData>> getTopCryptos(
            @RequestParam(defaultValue = "100") int limit,
            @RequestParam(defaultValue = "1") int page) {
        
        List<CoinMarketData> cryptos = coinGeckoService.getTopCryptos(limit, page);
        return ResponseEntity.ok(cryptos);
    }
    
    /**
     * Get current price for a specific cryptocurrency
     * 
     * @param coinId CoinGecko coin ID (e.g., "bitcoin", "ethereum")
     * @return Price data
     */
    @GetMapping("/price/{coinId}")
    public ResponseEntity<SimplePriceResponse.CoinPrice> getCoinPrice(@PathVariable String coinId) {
        SimplePriceResponse.CoinPrice price = coinGeckoService.getCoinPrice(coinId);
        
        if (price == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(price);
    }
    
    /**
     * Get prices for multiple cryptocurrencies
     * 
     * @param coinIds Comma-separated list of CoinGecko coin IDs
     * @return Map of coin ID to price data
     */
    @GetMapping("/prices")
    public ResponseEntity<Map<String, SimplePriceResponse.CoinPrice>> getMultiplePrices(
            @RequestParam String coinIds) {
        
        List<String> ids = List.of(coinIds.split(","));
        Map<String, SimplePriceResponse.CoinPrice> prices = coinGeckoService.getMultiplePrices(ids);
        
        return ResponseEntity.ok(prices);
    }
    
    /**
     * Search for cryptocurrencies by name or symbol
     * 
     * @param query Search query
     * @return List of matching coins
     */
    @GetMapping("/search")
    public ResponseEntity<List<CoinMarketData>> searchCoins(@RequestParam String query) {
        List<CoinMarketData> results = coinGeckoService.searchCoins(query);
        return ResponseEntity.ok(results);
    }
}
