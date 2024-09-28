package com.example.mutualrisk.fund.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.fund.dto.FundResponse;
import com.example.mutualrisk.fund.dto.FundResponse.FundPortfolioRecord;
import com.example.mutualrisk.fund.dto.FundResponse.FundResultDto;
import com.example.mutualrisk.fund.dto.FundResponse.FundSummaryResultDto;
import com.example.mutualrisk.fund.service.FundService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/funds")
@Slf4j
@Tag(name = "펀드관련 API",description = "펀드 조회/상세조회 및 펀드 변동기록 조회 Controller입니다")
public class FundController {

	private final FundService fundService;

	@Operation(summary = "모든 펀드 조회", description = "상위20개 13f 펀드사를 조회하는 api")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "펀드 조회 성공"),
	})
	@GetMapping("")
	public ResponseEntity<ResponseWithData> getAllfunds(HttpServletRequest request){

		Integer userId = (Integer)request.getAttribute("userId");
		// log.info("user Id : {}",userId);

		ResponseWithData<FundSummaryResultDto> allfunds = fundService.getAllFunds();

		return ResponseEntity.status(allfunds.status())
			.body(allfunds);
	}

	@Operation(summary = "펀드 정보 조회", description = "특정 13f 펀드사를 조회하는 api")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "펀드 조회 성공"),
	})
	@GetMapping("/{fundId}")
	public ResponseEntity<ResponseWithData> getFund(@PathVariable("fundId") String fundId,HttpServletRequest request){

		Integer userId = (Integer)request.getAttribute("userId");
		// log.info("user Id : {}",userId);

		ResponseWithData<FundResultDto> fund = fundService.getFund(userId,fundId);

		return ResponseEntity.status(fund.status())
			.body(fund);
	}

	@Operation(summary = "펀드 평가액 변동 기록 조회", description = "13f 펀드의 변동기록을 조회하는 api")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "변동기록 조회 성공"),
	})
	@GetMapping("/history")
	public ResponseEntity<ResponseWithData> getHistory(@RequestParam("period") Integer period,
		@RequestParam("company") String company,
		HttpServletRequest request){

		Integer userId = (Integer)request.getAttribute("userId");
		// log.info("user Id : {}",userId);

		ResponseWithData<List<FundPortfolioRecord>> fundHistory = fundService.getHistory(userId, company, period);

		return ResponseEntity.status(fundHistory.status())
			.body(fundHistory);
	}
}
