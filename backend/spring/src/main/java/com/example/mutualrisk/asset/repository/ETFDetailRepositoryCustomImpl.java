package com.example.mutualrisk.asset.repository;

import static com.example.mutualrisk.asset.entity.QAsset.*;
import static com.example.mutualrisk.asset.entity.QETFDetail.*;

import java.util.List;

import com.example.mutualrisk.asset.entity.ETFDetail;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;

public class ETFDetailRepositoryCustomImpl extends Querydsl4RepositorySupport implements ETFDetailRepositoryCustom {

	@Override
	public List<ETFDetail> findByAssetId(Integer assetId) {
		return
			selectFrom(eTFDetail)
				.join(eTFDetail.asset,asset).fetchJoin()
				.where(eTFDetail.asset.id.eq(assetId))
				.fetch();
	}
}
