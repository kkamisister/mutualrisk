package com.example.mutualrisk.fund.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.fund.dto.FundResponse.FundResultDto;
import com.example.mutualrisk.fund.service.FundService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/funds")
@Slf4j
public class FundController {

	private final FundService fundService;

	@GetMapping("/")
	public ResponseEntity<?> getAllfunds(HttpServletRequest request){

		Integer userId = (Integer)request.getAttribute("userId");
		log.info("user Id : {}",userId);

		ResponseWithData<FundResultDto> allfunds = fundService.getAllFunds();

		return ResponseEntity.status(allfunds.status())
			.body(allfunds);
	}



}
