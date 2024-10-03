package com.example.mutualrisk.asset.controller;

import static com.example.mutualrisk.asset.dto.AssetResponse.*;
import static com.example.mutualrisk.common.dto.CommonResponse.*;

import com.example.mutualrisk.asset.dto.AssetRequest.InterestAssetInfo;
import com.example.mutualrisk.asset.service.AssetHistoryService;
import com.example.mutualrisk.asset.service.AssetService;
import com.example.mutualrisk.common.enums.Order;
import com.example.mutualrisk.common.enums.OrderCondition;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/asset")
@Slf4j
@Validated
@Tag(name = "자산관련 API",description = "자산 검색,조회 유저 관심자산 CRUD를 수행하기위한 Controller입니다")
public class AssetController {

    private final AssetService assetService;
    private final AssetHistoryService assetHistoryService;

    @Operation(summary = "종목 조회", description = "자산ID기반 검색 결과를 반환하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "종목 조회 완료"),
    })
    @GetMapping("/{assetId}")
    public ResponseEntity<ResponseWithData<AssetResultDto>> getAsset(@PathVariable("assetId") @Parameter(description = "자산ID", required = true) Integer assetId){

        ResponseWithData<AssetResultDto> findAsset = assetService.getAssetByAssetId(assetId);

        return ResponseEntity.status(findAsset.status())
            .body(findAsset);
    }


    @Operation(summary = "종목 종가 기록 조회", description = "자산ID기반 기간내 종목 종가 기록을 반환하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "조회 완료"),
    })
    @GetMapping("/history/{assetId}")
    public ResponseEntity<ResponseWithData<AssetRecentHistory>> getAssetHistory(@PathVariable("assetId") @Parameter(description = "자산ID", required = true) Integer assetId,
        @RequestParam("period") @Positive(message = "기간은 1보다 작아질 수 없습니다.") Integer period,
        @RequestParam(value = "offset",required = false, defaultValue = "0") Integer offset){

        ResponseWithData<AssetRecentHistory> findAssetHistorys = assetHistoryService.getAssetRecentHistory(assetId,period,offset);
        
        return ResponseEntity.status(findAssetHistorys.status())
            .body(findAssetHistorys);

    }

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
    public ResponseEntity<ResponseWithData<AssetResultDto>> getUserInterestAssets(@RequestParam(value = "orderCondition", required = false, defaultValue = "NAME") String orderConditionString,
        @RequestParam(value = "sortOrder", required = false, defaultValue = "ASC") String orderString,
        HttpServletRequest request){

        Integer userId = (Integer)request.getAttribute("userId");

        OrderCondition orderCondition;
        Order order;
        try {
            orderCondition = OrderCondition.valueOf(orderConditionString.toUpperCase());
            order = Order.valueOf(orderString.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new MutualRiskException(ErrorCode.PARAMETER_INVALID);
        }

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
    public ResponseEntity<ResponseWithMessage> addInterestAsset(@RequestBody InterestAssetInfo asset,
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
    public ResponseEntity<ResponseWithMessage> deleteInterestAsset(@RequestParam("assetId") @Parameter(description = "자산ID", required = true) Integer assetId,
        HttpServletRequest request){

        Integer userId = (Integer)request.getAttribute("userId");
        log.info("user Id : {}",userId);

        ResponseWithMessage responseWithMessage = assetService.deleteInterestAsset(userId, assetId);

        return ResponseEntity.status(responseWithMessage.status())
            .body(responseWithMessage);
    }

    // Todo: assetId에 음수가 오지 못하도록 valid설정
    @Operation(summary = "종목 상세정보 조회", description = "국장주식의 상세정보를 조회하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "상세정보 조회 성공"),
    })
    @GetMapping("/detail/stock")
    public ResponseEntity<ResponseWithData<StockTrendWithDetail>> stockDetail(@RequestParam("assetId") Integer assetId) {

        ResponseWithData<StockTrendWithDetail> stockTrendWithDetail = assetService.getStockTrendWithDetail(assetId);

        log.warn("주식 세부사항 : {}",stockTrendWithDetail);
        return ResponseEntity.status(stockTrendWithDetail.status())
            .body(stockTrendWithDetail);
    }

    @Operation(summary = "종목 상세정보 조회", description = "국장ETF의 상세정보를 조회하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "상세정보 조회 성공"),
    })
    @GetMapping("/detail/etf")
    public ResponseEntity<ResponseWithData<ETFInfo>> etfDetail(@RequestParam("assetId") @Parameter(description = "자산ID", required = true) Integer assetId){

        ResponseWithData<ETFInfo> info = assetService.getETFDetail(assetId);
        return ResponseEntity.status(info.status())
            .body(info);
    }
}
