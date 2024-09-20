package com.example.mutualrisk.asset.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;

public record AssetResponse() {

    @Builder
    @Schema(name = "종목 검색 결과 데이터", description = "키워드 기반 종목 검색 결과를 반환"
        + "종목 검색 결과 반환 및 유저 관심종목 추가에 대한 응답으로 사용")
    public record AssetResultDto(
        Integer assetNum,
        List<AssetInfo> assets
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
            Double price,
            String region,
            Double returns
    ) {

        public static AssetInfo of(Asset asset, AssetHistory assetHistory){
            return AssetInfo.builder()
                .assetId(asset.getId())
                .name(asset.getName())
                .code(asset.getCode())
                .imagePath(asset.getImagePath())
                .imageName(asset.getImageName())
                .price(assetHistory.getPrice())
                .region(asset.getRegion().name())
                .returns(asset.getExpectedReturn())
                .build();


        }
    }


}
