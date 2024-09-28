package com.example.mutualrisk.asset.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mutualrisk.asset.entity.StockTrend;

public interface StockTrendRepository extends JpaRepository<StockTrend, Integer> {
	List<StockTrend> findByAssetId(Integer assetId);

}
