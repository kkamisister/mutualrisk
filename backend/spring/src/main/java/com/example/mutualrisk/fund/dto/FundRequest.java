package com.example.mutualrisk.fund.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record FundRequest() {

	public record FundDetailRequest(

		@Schema(
			description = "펀드 상세조회 시 id를 받음",
			example = "66f2006263f7a6c4199af280"
		)
		String fundId
	){

	}

	public record FundRecordRequest(
		@Schema(
			description = "펀드 포트폴리오 평가액 변동 기간",
			example = "1"
		)
		Integer period,
		String fundId
	){

	}
}
