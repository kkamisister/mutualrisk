package com.example.mutualrisk.asset.controller;

import static com.example.mutualrisk.asset.dto.AssetRequest.*;
import static com.example.mutualrisk.asset.dto.AssetResponse.*;
import static com.example.mutualrisk.common.dto.CommonResponse.*;

import com.example.mutualrisk.asset.service.AssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/asset")
@Slf4j
public class AssetController {

    private final AssetService assetService;

    @Operation(summary = "종목 검색", description = "키워드 기반 종목 검색 결과를 반환하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "종목 검색 조회 완료"),
    })
    @GetMapping("/keyword")
    public ResponseEntity<ResponseWithData<AssetSearchResultDto>> assetSearchByKeyword(@RequestParam("keyword") String keyword) {
        log.info("api 정상 실행");
        ResponseWithData<AssetSearchResultDto> assetSearchResultDto = assetService.searchByKeyword(keyword);
        return ResponseEntity.status(assetSearchResultDto.status())
            .body(assetSearchResultDto);
    }
}
