package com.example.mutualrisk.asset.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mutualrisk.asset.entity.AssetCovariance;

public interface AssetCovarianceRepository extends JpaRepository<AssetCovariance, Integer>, AssetCovarianceRepositoryCustom {

}
