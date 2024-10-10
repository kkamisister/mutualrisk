package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.entity.QAsset;
import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.example.mutualrisk.asset.entity.QAsset.*;
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
    public List<AssetHistory> findHistoryOfAssets(List<Asset> assets, LocalDateTime dateTime) {

        // LocalDateTime truncatedDateTime = dateTime.truncatedTo(ChronoUnit.SECONDS); // 밀리초 제거

        return select(assetHistory)
            .from(assetHistory)
            .where(assetHistory.asset.in(assets)
                .and(assetHistory.date.eq(dateTime)))
            .fetch();

    }

    @Override
    public List<AssetHistory> findAllHistoryOfAssets(Asset asset, List<LocalDateTime> dateTimes) {
        return selectFrom(assetHistory)
            .where(assetHistory.asset.eq(asset)
                .and(assetHistory.date.in(dateTimes)))
            .fetch();
    }

    @Override
    public List<AssetHistory> findRecentHistoryOfAsset(Asset asset,Integer period,Integer offset) {
        return selectFrom(assetHistory)
            .join(assetHistory.asset, QAsset.asset).fetchJoin()
            .where(assetHistory.asset.eq(asset))
            .orderBy(assetHistory.date.desc())
            .offset(offset)
            .limit(period)
            .fetch();
    }

    @Override
    public List<AssetHistory> findRecentHistoriesBetweenDates(Asset asset, LocalDateTime pastDate, LocalDateTime targetDate) {
        return selectFrom(assetHistory)
            .where(assetHistory.asset.eq(asset)
                .and(assetHistory.date.between(pastDate, targetDate)))
            .fetch();
    }

    @Override
    public List<AssetHistory> findRecentHistoryOfAssetsBetweenDates(List<Asset> assetList,
        LocalDateTime pastDate, LocalDateTime targetDate) {
        return selectFrom(assetHistory)
            .join(assetHistory.asset,asset).fetchJoin()
            .where(assetHistory.asset.in(assetList)
                .and(assetHistory.date.between(pastDate, targetDate)))
            // .groupBy(assetHistory.asset)
            .fetch();
    }

    @Override
    public List<Double> getDailyChangeRate(Integer assetId, LocalDateTime startTime, LocalDateTime endTime) {
        return select(assetHistory.dailyPriceChangeRate)
            .from(assetHistory)
            .where(assetHistory.asset.id.eq(assetId)
                .and(assetHistory.date.between(startTime, endTime)))
            .fetch();
    }
}
