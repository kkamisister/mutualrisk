package com.example.mutualrisk.asset.dto;

import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.entity.ETFDetail;
import com.example.mutualrisk.asset.entity.News;
import com.example.mutualrisk.asset.entity.StockDetail;
import com.example.mutualrisk.asset.entity.StockTrend;
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

    @Builder
    @Schema(name = "주식 거래 데이터 반환 DTO",description = ""
        + "매매현황을 포함하여 주식 상세정보를 반환한다")
    public record StockTrendWithDetail(
        Integer recordNum,
        Integer assetId,
        String name,
        String code,
        String summary,
        String marketValue,
        String per,
        String pbr,
        String eps,
        List<StockRecord> records
    ){
        public static StockTrendWithDetail of(List<StockRecord> records, StockDetail stockDetail){
            return StockTrendWithDetail.builder()
                .name(stockDetail.getAsset().getName())
                .recordNum(records.size())
                .assetId(stockDetail.getAsset().getId())
                .code(stockDetail.getCode())
                .summary(stockDetail.getAsset().getSummary())
                .marketValue(stockDetail.getMarketValue())
                .per(stockDetail.getPer())
                .pbr(stockDetail.getPbr())
                .eps(stockDetail.getEps())
                .records(records)
                .build();

        }
    }

    @Builder
    @Schema(name = "주식 거래 데이터",description = ""
        + "네이버 증권에서 가져온 외국인,기관,개인 매매현황을 반환한다")
    public record StockRecord(
        LocalDateTime date,
        Integer foreignerPureBuyQuant,
        Double foreignerHoldRatio,
        Integer organPureBuyQuant,
        Integer individualPureBuyQuant,
        Integer accumulatedTradingVolume
    ){
        public static StockRecord from(StockTrend trend){
            return StockRecord.builder()
                .date(trend.getDate())
                .foreignerPureBuyQuant(trend.getForeignerPureBuy())
                .foreignerHoldRatio(trend.getForeignerHoldRatio())
                .organPureBuyQuant(trend.getOrganPureBuy())
                .individualPureBuyQuant(trend.getIndividualPureBuy())
                .accumulatedTradingVolume(trend.getAccumulatedTradingVolume())
                .build();
        }
    }


    @Builder
    public record ETFInfo(
        Integer etfNum,
        Integer assetId,
        String code,
        String summary,
        String name,
        List<ETFRecord> portfolio
    ){
        public static ETFInfo of(List<ETFDetail> details,List<ETFRecord> record){
            return ETFInfo.builder()
                .etfNum(details.size())
                .assetId(details.get(0).getAsset().getId())
                .code(details.get(0).getAsset().getCode())
                .summary(details.get(0).getAsset().getSummary())
                .name(details.get(0).getAsset().getName())
                .portfolio(record)
                .build();

        }

    }
    @Builder
    public record ETFRecord(
        String assetName,
        String stockCount
    ){
        public static ETFRecord from(ETFDetail detail){
            return ETFRecord.builder()
                .assetName(detail.getAssetName())
                .stockCount(detail.getStockCount())
                .build();
        }
    }


}
