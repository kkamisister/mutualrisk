package com.example.mutualrisk.asset.repository;

import static com.example.mutualrisk.asset.entity.QAssetCovariance.*;

import java.util.List;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetCovariance;
import com.example.mutualrisk.asset.entity.QAssetCovariance;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;

public class AssetCovarianceRepositoryCustomImpl extends Querydsl4RepositorySupport implements AssetCovarianceRepositoryCustom {

	@Override
	public List<AssetCovariance> findAllVolatilityByAssets(List<Integer> assetIds) {
		return selectFrom(assetCovariance)
			.where(assetCovariance.asset1.id.eq(assetCovariance.asset2.id)
			.and(assetCovariance.asset1.id.in(assetIds)))
			.fetch();
	}

	@Override
	public List<AssetCovariance> findAllCovarianceIn(List<Asset> assetList) {
		return selectFrom(assetCovariance)
			.where(assetCovariance.asset1.in(assetList)
				.and(assetCovariance.asset2.in(assetList)))
			.fetch();
	}

	@Override
	public List<AssetCovariance> findAllCovarianceByAssetsAndAssetId(List<Asset> assetList, Integer assetId) {
		return selectFrom(assetCovariance)
			.where(assetCovariance.asset1.in(assetList)
				.and(assetCovariance.asset2.id.eq(assetId)))
			.fetch();
	}
}
