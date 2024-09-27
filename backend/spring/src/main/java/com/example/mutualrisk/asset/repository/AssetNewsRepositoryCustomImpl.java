package com.example.mutualrisk.asset.repository;



import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetNews;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;

import static com.example.mutualrisk.asset.entity.QAssetNews.*;

import java.util.List;
import java.util.Optional;

public class AssetNewsRepositoryCustomImpl extends Querydsl4RepositorySupport implements AssetNewsRepositoryCustom{

    @Override
    public List<AssetNews> findByAssetIn(List<Asset> userInterestAssetList) {
        return selectFrom(assetNews)
            .where(assetNews.asset.in(userInterestAssetList))
            .orderBy(assetNews.news.publishedAt.desc())
            .limit(10)
            .fetch();
    }

    @Override
    public List<AssetNews> findByAsset(Asset asset) {
        return selectFrom(assetNews)
            .where(assetNews.asset.eq(asset))
            .orderBy(assetNews.news.publishedAt.desc())
            .limit(10)
            .fetch();
    }

}
