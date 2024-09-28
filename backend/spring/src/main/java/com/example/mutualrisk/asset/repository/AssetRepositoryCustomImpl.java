package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;
import com.example.mutualrisk.industry.entity.QIndustry;
import com.example.mutualrisk.sector.entity.QSector;
import com.querydsl.core.types.dsl.CaseBuilder;

import static com.example.mutualrisk.asset.entity.QAsset.asset;
import static com.example.mutualrisk.industry.entity.QIndustry.*;
import static com.example.mutualrisk.sector.entity.QSector.*;

import java.util.List;

public class AssetRepositoryCustomImpl extends Querydsl4RepositorySupport implements AssetRepositoryCustom {
    @Override
    public List<Asset> searchByKeyword(String keyword) {
        return selectFrom(asset)
            .where(asset.name.likeIgnoreCase("%" + keyword + "%")
                .or(asset.code.likeIgnoreCase("%" + keyword + "%")))
            .orderBy(new CaseBuilder()
                .when(asset.name.eq(keyword)).then(0)
                .when(asset.code.eq(keyword)).then(1)
                .when(asset.name.startsWithIgnoreCase(keyword)).then(2)
                .when(asset.code.startsWithIgnoreCase(keyword)).then(3)
                .when(asset.name.containsIgnoreCase(keyword)).then(4)
                .when(asset.code.containsIgnoreCase(keyword)).then(5)
                .when(asset.name.endsWithIgnoreCase(keyword)).then(6)
                .when(asset.code.endsWithIgnoreCase(keyword)).then(7)
                .otherwise(8).asc()
            )
            .limit(10)
            .fetch();
    }

    @Override
    public List<Asset> findByIds(List<Integer> ids) {
        return selectFrom(asset)
            .innerJoin(asset.industry, industry).fetchJoin()
            .innerJoin(industry.sector, sector).fetchJoin()
            .where(asset.id.in(ids))
            .fetch();
    }

}
