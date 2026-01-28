package com.cryptoportfolio.controller;

import com.cryptoportfolio.dto.CreateDigitalAssetRequest;
import com.cryptoportfolio.entity.DigitalAsset;
import com.cryptoportfolio.service.DigitalAssetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class DigitalAssetController {
    
    private final DigitalAssetService digitalAssetService;
    
    public DigitalAssetController(DigitalAssetService digitalAssetService) {
        this.digitalAssetService = digitalAssetService;
    }
    
    @GetMapping
    public ResponseEntity<List<DigitalAsset>> getAllAssets() {
        return ResponseEntity.ok(digitalAssetService.getAllAssets());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DigitalAsset> getAssetById(@PathVariable Long id) {
        return ResponseEntity.ok(digitalAssetService.getAssetById(id));
    }
    
    @GetMapping("/symbol/{symbol}")
    public ResponseEntity<DigitalAsset> getAssetBySymbol(@PathVariable String symbol) {
        return ResponseEntity.ok(digitalAssetService.getAssetBySymbol(symbol));
    }
    
    @PostMapping
    public ResponseEntity<DigitalAsset> createAsset(@RequestBody CreateDigitalAssetRequest request) {
        return ResponseEntity.ok(digitalAssetService.createAsset(request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        digitalAssetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }
}
