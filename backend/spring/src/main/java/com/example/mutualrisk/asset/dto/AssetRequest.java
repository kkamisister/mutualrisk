package com.example.mutualrisk.asset.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

public record AssetRequest() {


    @Schema(name = "종목 검색 키워드 데이터", description = "종목 검색시 필요한 검색 조건 데이터")
    @Builder
    public record SearchInfo(
        @Schema(
            description = "유저가 종목 검색 시 입력하는 키워드. 종목명의 일부 혹은 종목 코드의 일부가 들어감",
                example = "삼성, 0059"
        )
        String keyword
    )  {

    }

    @Schema(name = "관심자산 추가 데이터",description = "유저가 관심자산으로 추가한 데이터")
    public record InterestAssetInfo(
        Integer assetId
    ){

    }

}
