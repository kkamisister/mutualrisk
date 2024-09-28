package com.example.mutualrisk.asset.repository;



import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetNews;
import com.example.mutualrisk.asset.entity.News;
import com.example.mutualrisk.asset.entity.QNews;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;

import static com.example.mutualrisk.asset.entity.QAsset.*;
import static com.example.mutualrisk.asset.entity.QAssetNews.*;
import static com.example.mutualrisk.asset.entity.QNews.*;

import java.util.List;
import java.util.Optional;

public class AssetNewsRepositoryCustomImpl extends Querydsl4RepositorySupport implements AssetNewsRepositoryCustom{

    @Override
    public List<AssetNews> findByAssetIn(List<Asset> userInterestAssetList) {
        return selectFrom(assetNews)
            .join(assetNews.news, news).fetchJoin()
            .join(assetNews.asset, asset).fetchJoin()
            .where(assetNews.asset.in(userInterestAssetList))
            .orderBy(assetNews.news.publishedAt.desc())
            .limit(10)
            .fetch();
    }

    @Override
    public List<AssetNews> findByAsset(Asset asset) {
        return selectFrom(assetNews)
            .join(assetNews.news,news).fetchJoin()
            .where(assetNews.asset.eq(asset))
            .orderBy(assetNews.news.publishedAt.desc())
            .limit(10)
            .fetch();
    }

    @Override
    public List<AssetNews> findAllByNews(News news) {
        return selectFrom(assetNews)
            .join(assetNews.asset, asset).fetchJoin()
            .join(assetNews.news, QNews.news).fetchJoin()
            .where(assetNews.news.eq(news))
            .fetch();
    }

}
