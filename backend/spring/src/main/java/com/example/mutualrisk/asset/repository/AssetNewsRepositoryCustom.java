package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetNews;
import com.example.mutualrisk.asset.entity.News;

import java.util.List;
import java.util.Optional;

public interface AssetNewsRepositoryCustom {
    List<AssetNews> findByAssetIn(List<Asset> userInterestAssetList);

    List<AssetNews> findByAsset(Asset asset);

    List<AssetNews> findAllByNews(News news);
}
