package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AssetHistoryRepositoryCustom {
    List<AssetHistory> findRecentTwoAssetHistory(Asset asset);

    Optional<AssetHistory> findRecentHistoryOfAsset(Asset asset, LocalDateTime dateTime);
    List<AssetHistory> findHistoryOfAssets(List<Asset> assets, LocalDateTime dateTime);

    List<AssetHistory> findRecentHistoryOfAsset(Asset asset,Integer period);

    List<AssetHistory> findRecentHistoriesBetweenDates(Asset asset, LocalDateTime pastDate, LocalDateTime targetDate);

    List<AssetHistory> findRecentHistoryOfAssetsBetweenDates(List<Asset> userInterestAssetList, LocalDateTime localDateTime, LocalDateTime now);
}
