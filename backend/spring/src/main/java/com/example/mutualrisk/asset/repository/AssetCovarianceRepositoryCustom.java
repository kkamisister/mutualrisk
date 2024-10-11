package com.example.mutualrisk.asset.repository;

import java.util.List;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetCovariance;

public interface AssetCovarianceRepositoryCustom {

	List<AssetCovariance> findAllVolatilityByAssets(List<Integer> assetIds);

    List<AssetCovariance> findAllCovarianceIn(List<Asset> assetList);

    List<AssetCovariance> findAllCovarianceByAssetsAndAssetId(List<Asset> assetList, Integer assetId);
}
