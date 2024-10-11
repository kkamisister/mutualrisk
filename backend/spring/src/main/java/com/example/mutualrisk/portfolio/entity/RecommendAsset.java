package com.example.mutualrisk.portfolio.entity;

import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecommendAsset {
    private Integer assetId;
    private String code;
    private Double expectedReturn;
    private Double volatility;
    private Double sharpeRatio;

    public static RecommendAsset from(RecommendAssetResponseResultDto recommendAssetResponseResultDto) {
        return RecommendAsset.builder()
            .assetId(recommendAssetResponseResultDto.assetId())
            .code(recommendAssetResponseResultDto.code())
            .expectedReturn(recommendAssetResponseResultDto.expectedReturn())
            .volatility(recommendAssetResponseResultDto.volatility())
            .sharpeRatio(recommendAssetResponseResultDto.sharpeRatio())
            .build();
    }
}
