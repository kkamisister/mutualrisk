package com.example.mutualrisk.asset.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mutualrisk.asset.entity.InterestAsset;

public interface InterestAssetRepository extends JpaRepository<InterestAsset,Integer>,InterestAssetRepositoryCustom {


}
