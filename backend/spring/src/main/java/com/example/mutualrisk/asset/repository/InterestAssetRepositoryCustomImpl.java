package com.example.mutualrisk.asset.repository;

import static com.example.mutualrisk.asset.entity.QAsset.*;
import static com.example.mutualrisk.asset.entity.QInterestAsset.*;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.InterestAsset;
import com.example.mutualrisk.common.enums.Order;
import com.example.mutualrisk.common.enums.OrderCondition;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;
import com.example.mutualrisk.user.entity.User;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;

@Repository
public class InterestAssetRepositoryCustomImpl extends Querydsl4RepositorySupport implements InterestAssetRepositoryCustom {

	@Override
	public List<InterestAsset> findUserInterestAssets(User user) {
		return select(interestAsset)
			.from(interestAsset)
			.join(interestAsset.asset,asset).fetchJoin()
			.where(interestAsset.user.eq(user))
			.fetch();
	}

	@Override
	public Optional<InterestAsset> findUserInterestAsset(User user, Asset asset) {
		InterestAsset findAsset = select(interestAsset)
			.from(interestAsset)
			.where(interestAsset.user.id.eq(user.getId()), interestAsset.asset.id.eq(asset.getId()))
			.fetchOne();

		return Optional.ofNullable(findAsset);
	}

}
