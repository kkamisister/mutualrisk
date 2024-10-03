package com.example.mutualrisk.asset.service;

import com.example.mutualrisk.asset.dto.AssetResponse;
import com.example.mutualrisk.asset.dto.AssetResponse.AssetRecentHistory;
import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;

import java.time.LocalDateTime;
import java.util.List;

public interface AssetHistoryService {
    Double getAssetPrice(Asset asset, LocalDateTime targetDate);

    List<AssetHistory> getAssetHistoryList(List<Asset> assetList, LocalDateTime targetDate);

    // targetDate와 가장 가까운 영업일 날짜 n개를 반환하는 함수
    List<LocalDateTime> getValidDate(Asset asset, LocalDateTime targetDate, int num);

    ResponseWithData<AssetRecentHistory> getAssetRecentHistory(Integer assetId,Integer period,Integer offset);
}
