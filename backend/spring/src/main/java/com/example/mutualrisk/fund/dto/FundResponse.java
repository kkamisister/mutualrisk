package com.example.mutualrisk.fund.dto;

import java.util.List;

import com.example.mutualrisk.fund.entity.Fund;
import com.example.mutualrisk.fund.entity.FundAsset;
import com.example.mutualrisk.sector.entity.Sector;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

public record FundResponse() {

	@Builder
	@Schema(name = "펀드 조회 데이터",description = "펀드 조회 전체 결과")
	public record FundResultDto(
		FundInfo fund,
		List<SectorInfo> sectors
	){


	}
	@Builder
	@Schema(name = "펀드 데이터",description = ""
		+ "개별 펀드 정보")
	public record FundInfo(
		Integer assetNum,
		String type,
		String ceo,
		String company,
		String submissionDate,
		Double QoQChangeOfValue,
		Double QoQTurnOver,
		List<FundAssetInfo> asset,
		long valueOfHoldings
	) {

		public static FundInfo of(Fund fund,List<FundAssetInfo> asset){
			return FundInfo.builder()
				.assetNum(asset.size())
				.type(fund.getType())
				.company(fund.getCompany())
				.submissionDate(fund.getSubmissionDate())
				.QoQChangeOfValue(fund.getQoQChangeOfValue())
				.QoQTurnOver(fund.getQoQTurnOver())
				.asset(asset)
				.valueOfHoldings(fund.getValueOfHoldings())
				.build();
		}

	}
	@Builder
	@Schema(name = "펀드 요약조회 데이터",description = "펀드 요약조회 전체 결과, 펀드 페이지에 필요한 모든 데이터를"
		+ "담는다")
	public record FundSummaryResultDto(
		Integer fundNum,
		List<FundSummaryInfo> funds,
		Fund topHoldAndBuyAmount
	){


	}

	@Builder
	@Schema(name = "펀드 요약정보",description = "상위 투자운용사 목록 정보, 상단의 이미지에 부분에 사용")
	public record FundSummaryInfo(
		String id,
		String ceo,
		String company,
		String image,
		Long valueOfHoldings
	){
		public static FundSummaryInfo from(Fund fund){
			return FundSummaryInfo.builder()
				.id(fund.getId())
				.ceo(fund.getCeo())
				.image(fund.getImage())
				.company(fund.getCompany())
				.valueOfHoldings(fund.getValueOfHoldings())
				.build();
		}
	}

	@Builder
	@Schema(name = "펀드 자산 상세 데이터",description = "펀드에 속하는 자산의 데이터"
		+ "code가 -1이면 기타자산에 속함")
	public record FundAssetInfo(
		Integer assetId,
		String code,
		String name,
		String region,
		Double dailyChangeRate,
		Integer rank,
		Boolean interest,
		Long valueOfHolding
	){
		public static FundAssetInfo of(FundAsset item,Double dailyChangeRate,Integer rank,Boolean interest){
			return FundAssetInfo.builder()
				.assetId(item.getAssetId())
				.code(item.getCode())
				.name(item.getName())
				.region(item.getRegion())
				.dailyChangeRate(dailyChangeRate)
				.rank(rank)
				.interest(interest)
				.valueOfHolding(item.getValueOfHolding())
				.build();
		}

	}

	@Builder
	@Schema(name = "섹터편중 데이터",description = "현재 포트폴리오의 각 섹터에 대한 비중을 가지는 데이터")
	public record SectorInfo(
		Integer sectorId,
		String name,
		Double weight
	){
		public static SectorInfo of(Sector sector,Double ratio){
			return SectorInfo.builder()
				.sectorId(sector.getId())
				.name(sector.getName())
				.weight(ratio)
				.build();
		}
	}

}
