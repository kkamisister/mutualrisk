package com.example.mutualrisk.portfolio.dto;

import com.example.mutualrisk.asset.dto.AssetResponse.*;
import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.common.enums.PerformanceMeasure;
import com.example.mutualrisk.common.enums.TimeInterval;
import com.example.mutualrisk.portfolio.entity.FrontierPoint;
import com.example.mutualrisk.portfolio.entity.Portfolio;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

public record PortfolioResponse() {

    @Builder
    @Schema(name = "포트폴리오의 요약 정보 데이터", description = "유저의 포트폴리오 전체 조회 시 반환되는 데이터")
    public record SimplePortfolioDto(
        String id,
        String name,
        Integer version,
        LocalDateTime createdAt
    ) {
        public static SimplePortfolioDto from(Portfolio portfolio) {
            return SimplePortfolioDto.builder()
                .id(portfolio.getId())
                .name(portfolio.getName())
                .version(portfolio.getVersion())
                .createdAt(portfolio.getCreatedAt())
                .build();
        }
    }

    @Builder
    @Schema(name = "포트폴리오 검색 결과 데이터", description = "유저의 개별 포트폴리오 조회 시 반환되는 데이터")
    public record PortfolioResultDto(
        Boolean hasPortfolio,
        PortfolioInfo portfolio
    ) {

    }

    @Builder
    @Schema(name = "포트폴리오 상세 데이터", description = "실제 포트폴리오 정보를 담은 데이터")
    public record PortfolioInfo(
        String portfolioId,
        PortfolioPerformance performance,
        List<PortfolioAssetInfo> assets
    ) {

    }

    @Builder
    @Schema(name = "포트폴리오의 성능을 나타내는 지표")
    public record PortfolioPerformance(
        Double expectedReturn,
        Double volatility,
        Double sharpeRatio,
        Double valuation
    ) {

    }

    @Builder
    @Schema
    public record PortfolioTotalSearchDto(
        Boolean hasPortfolio,
        Double recentValuation,
        List<SimplePortfolioDto> portfolioList
    ) {

    }

    @Builder
    @Schema(name = "포트폴리오에 담긴 개별 종목 데이터", description = "유저 포트폴리오에 담긴 종목 데이터")
    public record PortfolioAssetInfo(
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
        String dailyPriceChange,
        Double weight,
        Double valuation
    ) {
        public static PortfolioAssetInfo of(AssetInfo assetInfo, Double weight, Double valuation) {
            return PortfolioAssetInfo.builder()
                .assetId(assetInfo.assetId())
                .name(assetInfo.name())
                .code(assetInfo.code())
                .imagePath(assetInfo.imagePath())
                .imageName(assetInfo.imageName())
                .market(assetInfo.market())
                .price(assetInfo.price())
                .region(assetInfo.region())
                .expectedReturn(assetInfo.expectedReturn())
                .dailyPriceChangeRate(assetInfo.dailyPriceChangeRate())
                .dailyPriceChange(assetInfo.dailyPriceChange())
                .weight(weight)
                .valuation(valuation)
                .build();
        }
    }

    @Builder
    @Schema(name = "포트폴리오 백테스팅 결과 조회 데이터")
    public record PortfolioBackTestDto(
        PortfolioValuationDto benchMark,
        PortfolioValuationDto portfolioValuation
    ) {

    }

    @Builder
    @Schema(name = "포트폴리오 이익률 추이 데이터", description = "유저 포트폴리오의 수익률 추이 데이터")
    public record PortfolioValuationDto(
        TimeInterval timeInterval,
        PerformanceMeasure measure,
        String portfolioId,
        List<Performance> performances
    ) {

    }

    @Builder
    @Schema(name = "날짜별 포트폴리오의 자산 평가액을 나타내는 데이터")
    public record Performance(
        LocalDateTime time,
        Double valuation
    ) {

    }

    @Builder
    @Schema(name = "효율적 포트폴리오 곡선을 나타내는 데이터")
    public record FrontierDto (
        List<FrontierPoint> frontierPoints,
        PortfolioPerformance optimalPerformance
    ) {

    }

    @Builder
    public record PortfolioReturnDto (
        LocalDateTime date,
        Double portfolioReturns
    ) {

    }

    @Builder
    @Schema(name = "포트폴리오 제작시 보여 주는 데이터")
    public record CalculatedPortfolio(
        PortfolioAnalysis original,    // 새롭게 추천해 주는 포트폴리오에 대한 정보
        // PortfolioAnalysis recommendation,    // 추천 종목을 추가하였을 때, 포트폴리오에 대한 정보
        List<RecommendAssetInfo> oldPortfolioAssetInfoList,    // 기존 포트폴리오 종목에 대한 정보
        List<RecommendAssetInfo> newPortfolioAssetInfoList,    // 새롭게 추천해 주는 포트폴리오에 대한 정보
        List<ChangeAssetInfo> changeAssetInfoList    // 종목별 보유량 변화 정보
    ){

    }

    @Builder
    @Schema(name = "종목 보유량 변화 정보")
    public record ChangeAssetInfo (
        Integer assetId,
        String name,
        String code,
        String imagePath,
        String imageName,
        Double price,
        String region,
        String market,
        Double weight,
        Integer oldPurchaseNum,
        Integer newPurchaseNum
    ) {

    }

    @Builder
    public record PortfolioAnalysis(
        PortfolioPerformance fictionalPerformance,
        PortfolioPerformance performance,
        List<RecommendAssetInfo> assets
    ){
        public static PortfolioAnalysis of(PortfolioPerformance fictionalPerformance, PortfolioPerformance portfolioPerformance, List<RecommendAssetInfo> assets) {
            return PortfolioAnalysis.builder()
                .fictionalPerformance(fictionalPerformance)
                .performance(portfolioPerformance)
                .assets(assets)
                .build();
        }

    }

    @Builder
    public record RecommendAssetInfo(
        Integer assetId,
        String name,
        String code,
        String imagePath,
        String imageName,
        Double price,
        String region,
        String market,
        Double weight,
        Integer purchaseNum
    ){
        public static RecommendAssetInfo of(Asset asset,Double weight,Integer purchaseNum){

            String imageName = asset.getCode()+".png";

            return RecommendAssetInfo.builder()
                .assetId(asset.getId())
                .name(asset.getName())
                .code(asset.getCode())
                .imagePath(asset.getImagePath())
                .imageName(imageName)
                .price(asset.getRecentPrice())
                .region(asset.getRegion().toString())
                .market(asset.getMarket().name())
                .weight(weight)
                .purchaseNum(purchaseNum)
                .build();

        }
    }

    @Builder
    public record PortfolioStatusSummary(
        LocalDateTime created_at,
        Double curValuation,
        Double lastValuation,
        Double initValuation,
        Double sharpeRatio,
        RiskRatio krxSharpeRatio,
        RiskRatio krxETFSharpeRatio,
        RiskRatio nasdaqSharpeRatio,
        RiskRatio nasdaqETFSharpeRatio
    ){

    }

    public record RiskRatio(
        Integer total,
        Integer rank
    ){
        public static RiskRatio of(Integer total,Integer rank){
            return new RiskRatio(total,rank);
        }
    }

    /**
     * asset + weights 를 담고 있는 dto
     * 포트폴리오의 expected_return과, volatility를 구하기 위해 사용한다
     */
    public record AssetWeightDto(
        Asset asset,
        Double weight
    ) {
        public static AssetWeightDto of(Asset asset, Double weight) { return new AssetWeightDto(asset, weight);}
    }


}
