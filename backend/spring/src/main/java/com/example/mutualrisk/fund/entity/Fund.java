package com.example.mutualrisk.fund.entity;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;


import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection="13f")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Fund {

	@Id @Field(value = "_id",targetType = FieldType.OBJECT_ID)
	private String id;
	private String type;
	private String company;
	private String image;
	private String ceo;

	private long valueOfHoldings;
	private Double QoQChangeOfValue;
	private Double QoQTurnOver;

	@Override
	public String toString() {
		return "Fund{" +
			"submissionDate='" + submissionDate + '\'' +
			", QoQTurnOver=" + QoQTurnOver +
			", QoQChangeOfValue=" + QoQChangeOfValue +
			", valueOfHoldings=" + valueOfHoldings +
			", ceo='" + ceo + '\'' +
			", image='" + image + '\'' +
			", company='" + company + '\'' +
			", type='" + type + '\'' +
			", id='" + id + '\'' +
			'}';
	}

	private List<FundAsset> asset;
	private List<FundAsset> topHoldAsset;
	private List<FundAsset> topBuyAsset;

	private LocalDateTime submissionDate;
}
