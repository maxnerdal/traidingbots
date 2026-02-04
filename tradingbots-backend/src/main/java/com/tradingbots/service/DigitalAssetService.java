package com.tradingbots.service;

import com.tradingbots.dto.CreateDigitalAssetRequest;
import com.tradingbots.dto.coingecko.CoinMarketData;
import com.tradingbots.entity.DigitalAsset;
import com.tradingbots.repository.DigitalAssetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DigitalAssetService {
    
    private static final Logger logger = LoggerFactory.getLogger(DigitalAssetService.class);
    
    private final DigitalAssetRepository digitalAssetRepository;
    private final CoinGeckoService coinGeckoService;
    
    public DigitalAssetService(DigitalAssetRepository digitalAssetRepository, CoinGeckoService coinGeckoService) {
        this.digitalAssetRepository = digitalAssetRepository;
        this.coinGeckoService = coinGeckoService;
    }
    
    @Transactional(readOnly = true)
    public List<DigitalAsset> getAllAssets() {
        return digitalAssetRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public DigitalAsset getAssetById(Long id) {
        return digitalAssetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Digital asset not found with id: " + id));
    }
    
    @Transactional(readOnly = true)
    public DigitalAsset getAssetBySymbol(String symbol) {
        return digitalAssetRepository.findBySymbol(symbol)
                .orElseThrow(() -> new RuntimeException("Digital asset not found with symbol: " + symbol));
    }
    
    @Transactional
    public DigitalAsset createAsset(CreateDigitalAssetRequest request) {
        if (digitalAssetRepository.existsBySymbol(request.getSymbol())) {
            throw new RuntimeException("Digital asset already exists with symbol: " + request.getSymbol());
        }
        
        DigitalAsset asset = new DigitalAsset();
        asset.setSymbol(request.getSymbol().toUpperCase());
        asset.setName(request.getName());
        asset.setCoingeckoId(request.getCoingeckoId());
        
        return digitalAssetRepository.save(asset);
    }
    
    @Transactional
    public void deleteAsset(Long id) {
        if (!digitalAssetRepository.existsById(id)) {
            throw new RuntimeException("Digital asset not found with id: " + id);
        }
        digitalAssetRepository.deleteById(id);
    }
}
