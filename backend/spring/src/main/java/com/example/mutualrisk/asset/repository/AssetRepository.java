package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer>, AssetRepositoryCustom {

	Optional<Asset> findByCode(String code);
}
