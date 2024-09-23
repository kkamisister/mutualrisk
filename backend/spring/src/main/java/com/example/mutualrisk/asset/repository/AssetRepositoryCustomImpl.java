package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;
import com.querydsl.core.types.dsl.CaseBuilder;

import static com.example.mutualrisk.asset.entity.QAsset.asset;

import java.util.List;

public class AssetRepositoryCustomImpl extends Querydsl4RepositorySupport implements AssetRepositoryCustom {
    @Override
    public List<Asset> searchByKeyword(String keyword) {
        return selectFrom(asset)
            .where(asset.name.likeIgnoreCase("%" + keyword + "%")
                .or(asset.code.likeIgnoreCase("%" + keyword + "%")))
            .orderBy(new CaseBuilder()
                .when(asset.name.eq(keyword)).then(0)
                .when(asset.name.startsWithIgnoreCase(keyword)).then(1)
                .when(asset.name.containsIgnoreCase(keyword)).then(2)
                .when(asset.name.endsWithIgnoreCase(keyword)).then(3)
                .otherwise(4).asc()
            )
            .limit(10)
            .fetch();
    }
}
