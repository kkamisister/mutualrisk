package com.example.mutualrisk.fund.entity;


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

	private List<FundAsset> asset;
	private List<FundAsset> topHoldAsset;
	private List<FundAsset> topBuyAsset;

	private String submissionDate;
}
