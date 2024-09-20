package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;

import java.time.LocalDate;
import java.util.Optional;

public interface AssetHistoryRepositoryCustom {
    Optional<AssetHistory> findRecentAssetHistory(Asset asset);
}
