package com.example.mutualrisk.asset.dto;

import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.entity.News;
import com.example.mutualrisk.common.enums.Region;
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
        public static AssetResultDto of(List<AssetInfo> assets, List<NewsInfo> news){

            return AssetResultDto.builder()
                .assetNum(assets.size())
                .assets(assets)
                .newsNum(news.size())
                .news(news)
                .build();

        }

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

        public static AssetInfo of(Asset asset, List<AssetHistory> recentAssetHistoryList, Double exchangeRate) {

            // 서버에 저장된 이미지 이름.
            String imageName;
            double price;    // 현재 주식의 가격(원화 기준)
            double dailyPriceChange;    // 전일 대비 가격의 변화량(원화 기준)
            double dailyPriceChangeRate;    // 전일 대비 가격의 변화율(원화 기준)
            AssetHistory mostRecentAssetHistory = recentAssetHistoryList.get(0);
            AssetHistory secondRecentAssetHistory = recentAssetHistoryList.get(1);

            Double price1 = mostRecentAssetHistory.getPrice();
            Double price2 = secondRecentAssetHistory.getPrice();

            // 자산의 가격을 나타낼 때 원화 기준으로 나타내야 하고, imageName의 확장자가 다르므로 한국 주식일 때와 외국 주식을 나눠서 처리해야 한다
            // 자산이 한국 자산일 때
            if (asset.getRegion() == Region.KR) {
                price = price1;
                imageName = asset.getCode() + ".png";
                dailyPriceChange = price1 - price2;
                dailyPriceChangeRate = (price1 - price2) / price2 * 100;
            }
            // 아닌 경우: 자산이 외국 자산일 때
            else {
                price = price1 * exchangeRate;
                imageName = asset.getCode() + ".png";
                dailyPriceChange = (price1 - price2) * exchangeRate;
                dailyPriceChangeRate = (price1 - price2) / price2 * 100;
            }

            return AssetInfo.builder()
                .assetId(asset.getId())
                .name(asset.getName())
                .code(asset.getCode())
                .imagePath(asset.getImagePath())
                .imageName(imageName)
                .market(asset.getMarket().name())
                .price(price)
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
        public static NewsInfo of(News news,String cleanedTitle,List<AssetInfo> relatedAssetInfoList){

            return NewsInfo.builder()
                .newsId(news.getId())
                .link(news.getLink())
                .title(cleanedTitle)
                .thumbnailUrl(news.getThumbnailUrl())
                .publishedAt(news.getPublishedAt())
                .relatedAssets(relatedAssetInfoList)
                .build();
        }
    }


}
