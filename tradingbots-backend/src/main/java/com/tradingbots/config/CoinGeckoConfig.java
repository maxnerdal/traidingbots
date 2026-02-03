package com.tradingbots.config;

import okhttp3.OkHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

/**
 * Configuration for CoinGecko API
 */
@Configuration
public class CoinGeckoConfig {
    
    @Value("${coingecko.apiKey}")
    private String apiKey;
    
    @Value("${coingecko.baseUrl}")
    private String baseUrl;
    
    @Bean
    public OkHttpClient coinGeckoHttpClient() {
        return new OkHttpClient.Builder()
                .connectTimeout(Duration.ofSeconds(30))
                .readTimeout(Duration.ofSeconds(30))
                .writeTimeout(Duration.ofSeconds(30))
                .build();
    }
    
    public String getApiKey() {
        return apiKey;
    }
    
    public String getBaseUrl() {
        return baseUrl;
    }
}
