package com.example.mutualrisk.asset.service;

import com.example.mutualrisk.asset.entity.Asset;

import java.time.LocalDateTime;
import java.util.List;

public interface AssetHistoryService {
    Double getAssetPrice(Asset asset, LocalDateTime targetDate);

    List<Double> getAssetPrices(List<Asset> assetList, LocalDateTime targetDate);

    // targetDate와 가장 가까운 영업일 날짜 n개를 반환하는 함수
    List<LocalDateTime> getValidDate(Asset asset, LocalDateTime targetDate, int num);
}
