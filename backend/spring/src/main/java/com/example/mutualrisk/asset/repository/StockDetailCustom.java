package com.example.mutualrisk.asset.repository;

import java.util.Optional;

import com.example.mutualrisk.asset.entity.StockDetail;

public interface StockDetailCustom {

	Optional<StockDetail> findByAssetId(Integer assetId);
}
