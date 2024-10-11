package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetHistoryRepository extends JpaRepository<AssetHistory, Integer>, AssetHistoryRepositoryCustom {
}
