package com.example.mutualrisk.asset.dto;

import com.example.mutualrisk.asset.entity.Asset;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

public record AssetResponse() {

    @Builder
    @Schema(name = "종목 검색 결과 데이터", description = "키워드 기반 종목 검색 결과를 반환")
    public record AssetSearchResultDto(
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
            String currency,
            Double returns
    ) {
    }


}
