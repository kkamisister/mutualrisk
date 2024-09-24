package com.example.mutualrisk.asset.dto;

import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.entity.Region;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

import com.example.mutualrisk.asset.entity.Asset;

public record AssetResponse() {

    @Builder
    @Schema(name = "종목 검색 결과 데이터", description = "키워드 기반 종목 검색 결과를 반환"
        + "종목 검색 결과 반환 및 유저 관심종목 추가에 대한 응답으로 사용")
    public record AssetResultDto(
        Integer assetNum,
        List<AssetInfo> assets,
        Integer newsNum,
        List<NewsInfo> news
    ) {

    }

    @Builder
    @Schema(name = "개별 종목 상세 데이터", description = "유저가 종목 검색시 보여줄 데이터")
    public record AssetInfo(
        Integer assetId,
        String name,
        String code,
        String imagePath,
        String imageName,
        String market,
        Double price,
        String region,
        Double expectedReturn,
        String dailyPriceChangeRate,
        String dailyPriceChange
    ) {

        public static AssetInfo of(Asset asset, List<AssetHistory> recentAssetHistoryList) {
            String imageName = asset.getRegion().equals(Region.KR) ? asset.getCode() + ".svg" : asset.getCode() + ".png";

            AssetHistory mostRecentAssetHistory = recentAssetHistoryList.get(0);
            AssetHistory secondRecentAssetHistory = recentAssetHistoryList.get(1);

            double dailyPriceChange = mostRecentAssetHistory.getPrice() - secondRecentAssetHistory.getPrice();
            double dailyPriceChangeRate = dailyPriceChange / secondRecentAssetHistory.getPrice() * 100;

            return AssetInfo.builder()
                .assetId(asset.getId())
                .name(asset.getName())
                .code(asset.getCode())
                .imagePath(asset.getImagePath())
                .imageName(imageName)
                .market(asset.getMarket().name())
                .price(mostRecentAssetHistory.getPrice())
                .region(asset.getRegion().name())
                .expectedReturn(asset.getExpectedReturn())
                .dailyPriceChangeRate(dailyPriceChangeRate > 0
                    ? String.format("+%.2f", dailyPriceChangeRate)
                    : String.format("%.2f", dailyPriceChangeRate))
                .dailyPriceChange(dailyPriceChange > 0
                    ? String.format("+%.2f", dailyPriceChange)
                    : String.format("%.2f", dailyPriceChange))
                .build();
        }

    }

    @Builder
    @Schema(name = "뉴스 상세 데이터", description = "종목 검색시 함께 보여줄 뉴스 데이터")
    public record NewsInfo(
        Integer newsId,
        String title,
        String link,
        String thumbnailUrl,
        LocalDateTime publishedAt,
        List<AssetInfo> relatedAssets
    ) {

    }


}
