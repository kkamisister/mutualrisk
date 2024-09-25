package com.example.mutualrisk.fund.dto;

import java.util.List;

import com.example.mutualrisk.fund.entity.Item;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

public record FundResponse() {


	@Builder
	@Schema(name = "펀드 조회 데이터",description = "펀드 조회 전체 결과")
	public record FundResultDto(
		Integer fundNum,
		List<FundInfo> funds
	){

	}

	@Builder
	@Schema(name = "펀드 데이터",description = ""
		+ "개별 펀드 정보")
	public record FundInfo(
		Integer assetNum,
		String type,
		String company,
		String submissionDate,
		List<FundAssetInfo> asset,
		long valueOfHoldings
	) {

	}

	@Builder
	@Schema(name = "펀드 자산 상세 데이터",description = "펀드 자산 데이터. "
		+ "code가 -1이면 기타자산에 속함")
	public record FundAssetInfo(
		Integer assetId,
		String code,
		String name,
		String region,
		Long valueOfHolding,
		Long changeValueOfHolding
	){
		public static FundAssetInfo from(Item item){
			return FundAssetInfo.builder()
				.assetId(item.getAssetId())
				.code(item.getCode())
				.name(item.getName())
				.region(item.getRegion())
				.valueOfHolding(item.getValueOfHolding())
				.changeValueOfHolding(item.getChangeValueOfHolding())
				.build();
		}

	}

}
