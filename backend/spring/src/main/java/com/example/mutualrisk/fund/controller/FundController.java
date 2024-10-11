package com.example.mutualrisk.fund.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;
import com.example.mutualrisk.fund.dto.FundResponse.FundReturnDto;
import com.example.mutualrisk.fund.dto.FundResponse.FundResultDto;
import com.example.mutualrisk.fund.dto.FundResponse.FundSummaryResultDto;
import com.example.mutualrisk.fund.service.FundService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
	public ResponseEntity<ResponseWithData<FundSummaryResultDto>> getAllfunds(HttpServletRequest request){

		String id = (String)request.getAttribute("userId");
		Integer userId = Integer.valueOf(id);

		ResponseWithData<FundSummaryResultDto> allfunds = fundService.getAllFunds(userId);

		return ResponseEntity.status(allfunds.status())
			.body(allfunds);
	}

	@Operation(summary = "펀드 정보 조회", description = "특정 13f 펀드사를 조회하는 api")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "펀드 조회 성공"),
	})
	@GetMapping("/{fundId}")
	public ResponseEntity<ResponseWithData<FundResultDto>> getFund(@PathVariable("fundId") String fundId,HttpServletRequest request){

		String id = (String)request.getAttribute("userId");
		Integer userId = Integer.valueOf(id);

		ResponseWithData<FundResultDto> fund = fundService.getFund(userId,fundId);

		return ResponseEntity.status(fund.status())
			.body(fund);
	}

	@Operation(summary = "펀드 평가액 변동 기록 조회", description = "특정 13f 펀드의 변동기록을 조회하는 api")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "변동기록 조회 성공"),
	})
	@GetMapping("/history")
	public ResponseEntity<ResponseWithData<List<FundReturnDto>>> getHistory(@RequestParam("period") Integer period,
                                                                            @RequestParam("company") @Parameter(description = "회사명", required = true) String company,
                                                                            HttpServletRequest request){
		String id = (String)request.getAttribute("userId");
		Integer userId = Integer.valueOf(id);

		ResponseWithData<List<FundReturnDto>> fundHistory = fundService.getHistory(userId, company, period);

		return ResponseEntity.status(fundHistory.status())
			.body(fundHistory);
	}

	/**
	 * 현존하는 펀드의 이전 직전분기 대비 수익률 및 동기간 sp500의 수익률을 계산하는 메서드
	 * @return
	 */
	@GetMapping("/build/returns")
	private ResponseEntity<?> buildReturns(){
		ResponseWithMessage responseWithMessage = fundService.buildReturns();

		return ResponseEntity.status(responseWithMessage.status())
			.body(responseWithMessage);
	}


}
