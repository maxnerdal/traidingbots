package com.cryptoportfolio.service;

import com.cryptoportfolio.dto.CreateDigitalAssetRequest;
import com.cryptoportfolio.entity.DigitalAsset;
import com.cryptoportfolio.repository.DigitalAssetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DigitalAssetService {
    
    private final DigitalAssetRepository digitalAssetRepository;
    
    public DigitalAssetService(DigitalAssetRepository digitalAssetRepository) {
        this.digitalAssetRepository = digitalAssetRepository;
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
