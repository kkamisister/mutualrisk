package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import static com.example.mutualrisk.asset.entity.QAssetHistory.assetHistory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AssetHistoryRepositoryCustomImpl extends Querydsl4RepositorySupport implements AssetHistoryRepositoryCustom{
    @Override
    public List<AssetHistory> findRecentTwoAssetHistory(Asset asset) {
        return select(assetHistory)
            .from(assetHistory)
            .where(assetHistory.asset.eq(asset))
            .orderBy(assetHistory.date.desc())
            .limit(2)
            .fetch();
    }

    @Override
    public Optional<AssetHistory> findRecentHistoryOfAsset(Asset asset, LocalDateTime dateTime) {
        AssetHistory recentAssetHistory = selectFrom(assetHistory)
            .where(assetHistory.asset.eq(asset)
                .and(assetHistory.date.eq(dateTime)))
            .fetchFirst();

        return Optional.ofNullable(recentAssetHistory);
    }

    @Override
    public List<AssetHistory> findRecentHistoryOfAssets(List<Asset> assets, LocalDateTime dateTime) {

        // LocalDateTime truncatedDateTime = dateTime.truncatedTo(ChronoUnit.SECONDS); // 밀리초 제거

        return select(assetHistory)
            .from(assetHistory)
            .where(assetHistory.asset.in(assets)
                .and(assetHistory.date.eq(dateTime)))
            .fetch();

    }

    @Override
    public Optional<AssetHistory> findOneAssetHistory(Asset asset, LocalDateTime dateTime) {

        log.warn("dateTime : {}",dateTime);

        return Optional.ofNullable(select(assetHistory)
            .from(assetHistory)
            .where(assetHistory.asset.eq(asset)
                .and(assetHistory.date.eq(dateTime)))
            .fetchFirst());
    }
}
