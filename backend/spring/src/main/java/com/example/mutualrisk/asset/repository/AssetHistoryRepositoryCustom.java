package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.cglib.core.Local;

public interface AssetHistoryRepositoryCustom {
    List<AssetHistory> findRecentTwoAssetHistory(Asset asset);

    List<AssetHistory> findRecentHistory(List<Asset> assets, LocalDateTime dateTime);
}
