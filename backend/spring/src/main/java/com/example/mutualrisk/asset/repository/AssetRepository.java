package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    @Query("SELECT a FROM Asset a WHERE a.name LIKE %:keyword% OR a.code LIKE %:keyword%")
    List<Asset> searchByKeyword(@Param("keyword") String keyword);
}
