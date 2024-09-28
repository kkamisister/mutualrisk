package com.example.mutualrisk.asset.repository;

import static com.example.mutualrisk.asset.entity.QAsset.*;
import static com.example.mutualrisk.asset.entity.QStockDetail.*;

import java.util.Optional;

import com.example.mutualrisk.asset.entity.StockDetail;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;

public class StockDetailCustomImpl extends Querydsl4RepositorySupport implements StockDetailCustom {
	@Override
	public Optional<StockDetail> findByAssetId(Integer assetId) {
		return Optional.ofNullable(selectFrom(stockDetail)
			.join(stockDetail.asset,asset).fetchJoin()
			.where(stockDetail.asset.id.eq(assetId))
			.fetchOne());
	}
}
