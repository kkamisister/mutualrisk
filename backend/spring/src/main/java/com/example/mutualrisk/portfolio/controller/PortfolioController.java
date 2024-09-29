package com.example.mutualrisk.portfolio.controller;

import java.util.List;

import com.example.mutualrisk.common.enums.PerformanceMeasure;
import com.example.mutualrisk.common.enums.TimeInterval;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;
import com.example.mutualrisk.fund.dto.FundResponse.SectorInfo;
import com.example.mutualrisk.portfolio.service.PortfolioService;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;

import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/portfolio")
@Slf4j
@Tag(name = "포트폴리오관련 API",
    description = "유저 포트폴리오 조회,백테스팅 Controller입니다")
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/my")
    public ResponseEntity<ResponseWithData<PortfolioResultDto>> getUserPortfolio(HttpServletRequest request) {
        Integer userId = (Integer)request.getAttribute("userId");

        ResponseWithData<PortfolioResultDto> portfolioInfo = portfolioService.getPortfolioInfo(userId);

        return ResponseEntity.status(portfolioInfo.status()).body(portfolioInfo);
    }

    /**
     * 전체 유저를 대상으로 비중변화가 +-10%p or 유저의 상한/하한을 넘은 경우 알람을 보내는 메서드
     * 이 메서드는 일반 유저가 접근할 수 없이 ADMIN 권한의 유저만 접근할 수 있도록 설정해야 할 듯
     *
     * Todo: 메서드 접근 권한 - 사실
     * @return
     */
    @Operation(summary = "메일발송", description = "리밸런싱이 필요한 유저에게 메일을 발송하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "메일 발송 성공"),
    })
    @PostMapping("/checking")
    @Hidden
    public ResponseEntity<ResponseWithMessage> checkPortfolios(){

        ResponseWithMessage responseWithMessage = portfolioService.sendRefreshMail();

        return ResponseEntity.status(responseWithMessage.status()).body(responseWithMessage);
    }

    @Operation(summary = "백테스팅 결과 조회", description = "현재 포트폴리오 자산 보유량 기준으로, 과거 평가액을 조회하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "백테스팅 결과 조회 성공")
    })
    @GetMapping("/backtest")
    public ResponseEntity<ResponseWithData<PortfolioValuationDto>> getUserPortfolioReturn(@RequestParam(value = "timeInterval", required = false, defaultValue = "DAY") String timeIntervalString, @RequestParam(value = "measure", required = false, defaultValue = "PROFIT") String measureString, HttpServletRequest request) {
        Integer userId = (Integer)request.getAttribute("userId");

        // parameter(Enum) 초기화
        TimeInterval timeInterval;
        PerformanceMeasure measure;
        try {
            timeInterval = TimeInterval.valueOf(timeIntervalString.toUpperCase());
            measure = PerformanceMeasure.valueOf(measureString.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new MutualRiskException(ErrorCode.PARAMETER_INVALID);
        }

        ResponseWithData<PortfolioValuationDto> portfolioBacktestingResultDto = portfolioService.getUserPortfolioPerformance(timeInterval, measure, userId);

        return ResponseEntity.status(portfolioBacktestingResultDto.status()).body(portfolioBacktestingResultDto);
    }

    @Operation(summary = "섹터정보 조회", description = "유저 포트폴리오의 섹터 편중을 조회하는 api")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "섹터 조회 성공"),
    })
    @GetMapping("/sector")
    public ResponseEntity<ResponseWithData<List<SectorInfo>>> getUserPortfolioSector(HttpServletRequest request) {

        Integer userId = (Integer)request.getAttribute("userId");

        ResponseWithData<List<SectorInfo>> userPortfolioSector = portfolioService.getUserPortfolioSector(userId);

        return ResponseEntity.status(userPortfolioSector.status())
            .body(userPortfolioSector);
    }

    @GetMapping("/frontier")
    public ResponseEntity<ResponseWithData<FrontierDto>> getFrontierPoints(HttpServletRequest request) {
        Integer userId = (Integer)request.getAttribute("userId");

        ResponseWithData<FrontierDto> frontierDtoResponseWithData = portfolioService.getFrontierPoints(userId);

        return ResponseEntity.status(frontierDtoResponseWithData.status())
            .body(frontierDtoResponseWithData);
    }

    @GetMapping("/valuation")
    public ResponseEntity<ResponseWithData<PortfolioValuationDto>> getValuation(@RequestParam(value = "timeInterval", required = false, defaultValue = "DAY") String timeIntervalString, @RequestParam(value = "measure", required = false, defaultValue = "PROFIT") String measureString, HttpServletRequest request) {
        Integer userId = (Integer)request.getAttribute("userId");

        // parameter(Enum) 초기화
        TimeInterval timeInterval;
        PerformanceMeasure measure;
        try {
            timeInterval = TimeInterval.valueOf(timeIntervalString.toUpperCase());
            measure = PerformanceMeasure.valueOf(measureString.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new MutualRiskException(ErrorCode.PARAMETER_INVALID);
        }

        ResponseWithData<PortfolioValuationDto> portfolioValuationDtoResponseWithData = portfolioService.getHistoricalValuation(timeInterval, measure, userId);

        return ResponseEntity.status(portfolioValuationDtoResponseWithData.status())
            .body(portfolioValuationDtoResponseWithData);
    }
}
