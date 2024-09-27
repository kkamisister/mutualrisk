package com.example.mutualrisk.asset.service;

import com.example.mutualrisk.asset.entity.Asset;

import java.time.LocalDateTime;
import java.util.List;

public interface AssetHistoryService {
    Double getAssetPrice(Asset asset, LocalDateTime targetDate);

    List<Double> getAssetPrices(List<Asset> assetList, LocalDateTime targetDate);
}
