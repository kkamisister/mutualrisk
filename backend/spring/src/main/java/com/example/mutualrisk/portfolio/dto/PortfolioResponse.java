package com.example.mutualrisk.portfolio.dto;

import com.example.mutualrisk.asset.dto.AssetResponse.*;
import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.common.enums.PerformanceMeasure;
import com.example.mutualrisk.common.enums.TimeInterval;
import com.example.mutualrisk.portfolio.entity.FictionalPerformance;
import com.example.mutualrisk.portfolio.entity.FrontierPoint;
import com.example.mutualrisk.portfolio.entity.PortfolioAsset;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.IntStream;

public record PortfolioResponse() {

    @Builder
    @Schema(name = "포트폴리오의 요약 정보 데이터", description = "유저의 포트폴리오 전체 조회 시 반환되는 데이터")
    public record SimplePortfolioDto(
        String id,
        Integer version
    ) {

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
        Double valuation
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
        FictionalPerformance optimalPerformance
    ) {

    }

    @Builder
    public record PortfolioReturnDto (
        LocalDateTime date,
        Double portfolioReturns
    ) {

    }
}
