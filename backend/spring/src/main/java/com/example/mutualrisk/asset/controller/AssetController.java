package com.example.mutualrisk.asset.controller;

import static com.example.mutualrisk.asset.dto.AssetResponse.*;
import static com.example.mutualrisk.common.dto.CommonResponse.*;

import com.example.mutualrisk.asset.dto.AssetRequest;
import com.example.mutualrisk.asset.service.AssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<ResponseWithData<AssetResultDto>> assetSearchByKeyword(@RequestParam("keyword") String keyword) {
        log.info("api 정상 실행");
        ResponseWithData<AssetResultDto> assetSearchResultDto = assetService.searchByKeyword(keyword);
        return ResponseEntity.status(assetSearchResultDto.status())
            .body(assetSearchResultDto);
    }

    @Operation(summary = "유저 관심종목 조회", description = "유저의 관심종목을 조회하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "유저 관심종목 조회 완료"),
    })
    @GetMapping("/interest")
    public ResponseEntity<ResponseWithData<AssetResultDto>> getUserInterestAssets(@RequestParam("orderCondition") String orderCondition,
        @RequestParam("sortOrder") String order,
        HttpServletRequest request){

        Integer userId = (Integer)request.getAttribute("userId");

        ResponseWithData<AssetResultDto> userInterestAssets = assetService.getUserInterestAssets(userId, orderCondition,
            order);

        return ResponseEntity.status(userInterestAssets.status())
            .body(userInterestAssets);
    }

    @Operation(summary = "유저 관심종목 추가", description = "유저의 관심종목을 추가하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "유저 관심종목 추가 성공"),
    })
    @PostMapping("/interest")
    public ResponseEntity<ResponseWithMessage> addInterestAsset(@RequestBody AssetRequest.InterestAssetInfo asset,
        HttpServletRequest request){

        Integer userId = (Integer)request.getAttribute("userId");
        log.info("user Id : {}",userId);

        ResponseWithMessage responseWithMessage = assetService.addInterestAsset(userId, asset);

        return ResponseEntity.status(responseWithMessage.status())
            .body(responseWithMessage);

    }

    @Operation(summary = "유저 관심종목 삭제", description = "유저의 관심종목을 삭제하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "유저 관심종목 삭제 성공"),
    })
    @DeleteMapping("/interest")
    public ResponseEntity<ResponseWithMessage> deleteInterestAsset(@RequestBody AssetRequest.InterestAssetInfo asset,
        HttpServletRequest request){

        Integer userId = (Integer)request.getAttribute("userId");
        log.info("user Id : {}",userId);

        ResponseWithMessage responseWithMessage = assetService.deleteInterestAsset(userId, asset);

        return ResponseEntity.status(responseWithMessage.status())
            .body(responseWithMessage);
    }
}
