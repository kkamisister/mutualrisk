package com.example.mutualrisk.asset.repository;

import java.util.List;
import java.util.Optional;

import com.example.mutualrisk.asset.entity.ETFDetail;

public interface ETFDetailRepositoryCustom {

	List<ETFDetail> findByAssetId(Integer assetId);

}
