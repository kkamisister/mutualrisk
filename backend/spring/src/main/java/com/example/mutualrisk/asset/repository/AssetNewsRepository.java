package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetNews;
import com.example.mutualrisk.asset.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetNewsRepository extends JpaRepository<AssetNews, Integer> {
    List<AssetNews> findAllByAsset(Asset asset);
    List<AssetNews> findAllByNews(News news);
    List<AssetNews> findByAssetIn(List<Asset> userInterestAssetList);
}
