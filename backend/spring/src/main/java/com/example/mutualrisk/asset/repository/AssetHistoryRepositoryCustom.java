package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;

import java.util.List;
import java.util.Optional;

public interface AssetHistoryRepositoryCustom {
    List<AssetHistory> findRecentTwoAssetHistory(Asset asset);
}
