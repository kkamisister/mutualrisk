package com.example.mutualrisk.fund.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection="13f_returns")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class FundReturns {
	@Id
	@Field(value = "_id",targetType = FieldType.OBJECT_ID)
	@MongoId
	private String id;
	private String type;
	private String company;
	private String image;
	private String ceo;

	private long valueOfHoldings;

	@Override
	public String toString() {
		return "Fund{" +
			"submissionDate='" + submissionDate + '\'' +
			", valueOfHoldings=" + valueOfHoldings +
			", ceo='" + ceo + '\'' +
			", image='" + image + '\'' +
			", company='" + company + '\'' +
			", type='" + type + '\'' +
			", id='" + id + '\'' +
			", fundReturn='" + fundReturn + '\'' +
			", sp500Return='" + sp500Return + '\'' +
			'}';
	}
	private LocalDateTime submissionDate;
	private Double fundReturn; // 바로 직전 분기의 펀드에 비해서 수익률이 얼마나 올랐는지 계산한다
	private Double sp500Return; // 바로 직전 분기의 sp500지수에 비해 수익률이 얼마나 올랐는지 계산한다
	private Double kospiReturn; // 바로 직전 분기의 kospi지수에 비해 수익률이 얼마나 올랐는지 계산한다

	public static FundReturns of(Fund fund,Double fundReturn,Double sp500Return,Double kospiReturn){

		return FundReturns.builder()
			.id(fund.getId())
			.fundReturn(fundReturn)
			.sp500Return(sp500Return)
			.kospiReturn(kospiReturn)
			.valueOfHoldings(fund.getValueOfHoldings())
			.ceo(fund.getCeo())
			.image(fund.getImage())
			.company(fund.getCompany())
			.type(fund.getType())
			.submissionDate(fund.getSubmissionDate())
			.build();
	}
}
