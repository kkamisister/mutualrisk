package com.example.mutualrisk.fund.entity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FundAsset {

	private Integer assetId;
	private String code;
	private String name;
	private String region;
	private Long valueOfHolding;
	private Long changeValueOfHolding;

	@Override
	public String toString() {
		return "FundAsset{" +
			"assetId=" + assetId +
			", code='" + code + '\'' +
			", name='" + name + '\'' +
			", region='" + region + '\'' +
			", valueOfHolding=" + valueOfHolding +
			", changeValueOfHolding=" + changeValueOfHolding +
			'}';
	}
}
