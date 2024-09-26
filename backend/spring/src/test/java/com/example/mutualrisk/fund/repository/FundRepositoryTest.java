package com.example.mutualrisk.fund.repository;


import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.mutualrisk.fund.entity.Fund;
import com.example.mutualrisk.fund.entity.FundAsset;


@SpringBootTest
class FundRepositoryTest {

	@Autowired
	private FundRepository fundRepository;

	@Test
	@DisplayName("펀드 목록을 조회하는 메서드")
	void getFunds(){
		//given
		FundAsset asset1 = FundAsset.builder()
			.code("005930")
			.name("삼성전자")
			.region("KR")
			.valueOfHolding(1L)
			.changeValueOfHolding(10L)
			.build();

		FundAsset asset2 = FundAsset.builder()
			.code("004444")
			.name("네이버")
			.region("KR")
			.valueOfHolding(15L)
			.changeValueOfHolding(100L)
			.build();

		FundAsset t1 = FundAsset.builder()
			.code("MSFT")
			.name("MICROSFOT CORP")
			.region("US")
			.valueOfHolding(8000L)
			.changeValueOfHolding(10000L)
			.build();

		FundAsset t2 = FundAsset.builder()
			.code("AAPL")
			.name("AAPLE INC")
			.region("US")
			.valueOfHolding(7238L)
			.changeValueOfHolding(15000L)
			.build();

		Fund f1 = Fund.builder()
			.type("fund")
			.company("버크셔")
			.image("imagePath")
			.ceo("워렌버핏")
			.asset(List.of(asset1,asset2))
			.topHoldAsset(List.of(t1,t2))
			.build();

		//when
		Fund saved = fundRepository.save(f1);

		//then
		Assertions.assertThat(saved.getAsset())
			.extracting(FundAsset::getCode)
			.containsExactly("005930","004444");

	}

}