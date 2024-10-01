package com.example.mutualrisk.portfolio.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

public record PortfolioRequest() {


	@Schema(name = "포트폴리오 제작 데이터를 담는 DTO",description = "유저가 포트폴리오 제작 시 입력한"
		+ "정보를 담는다")
	public record PortfolioInitDto(

		@Schema(name = "유저가 설정한 투자 금액",
			example="1500000"
		)
		Integer totalCash,
		@ArraySchema(schema = @Schema(
			description = "유저가 담은 자산의 id를 담은 리스트",
			example = "1,2,3,4,5",
			implementation = Integer.class
		))
		List<Integer> assetIds,
		@ArraySchema(schema = @Schema(
			description = "유저가 설정한 자산별 최소 제약조건",
			example = "0.05,0.03,0.08,0.2,0.02",
			implementation = Double.class
		))
		@JsonProperty("lower_bounds")
		List<Double> lowerBounds,
		@ArraySchema(schema = @Schema(
			description = "유저가 설정한 자산별 최대 제약조건",
			example = "0.5,0.5,0.5,0.5,0.5",
			implementation = Double.class
		))
		@JsonProperty("upper_bounds")
		List<Double> upperBounds
		// @ArraySchema(schema = @Schema(
		// 	description = "유저가 설정한 자산별 확정비율",
		// 	example = "null,0.2,null,0.3,null",
		// 	implementation = Double.class
		// ))
		// List<Double> exactProportion
	){
	}

}
