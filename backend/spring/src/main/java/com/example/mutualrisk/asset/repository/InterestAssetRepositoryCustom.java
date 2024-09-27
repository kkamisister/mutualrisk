package com.example.mutualrisk.asset.repository;

import java.util.List;
import java.util.Optional;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.InterestAsset;
import com.example.mutualrisk.common.enums.Order;
import com.example.mutualrisk.common.enums.OrderCondition;
import com.example.mutualrisk.user.entity.User;

public interface InterestAssetRepositoryCustom {

	List<InterestAsset> findUserInterestAssets(User user, OrderCondition orderCondition,Order order);
	List<InterestAsset> findUserInterestAssets(User user);
	Optional<InterestAsset> findUserInterestAsset(User user, Asset asset);

}
