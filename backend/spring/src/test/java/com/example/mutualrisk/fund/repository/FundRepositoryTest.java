package com.example.mutualrisk.fund.repository;


import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.example.mutualrisk.fund.entity.Fund;
import com.example.mutualrisk.fund.entity.FundAsset;


@SpringBootTest
@Transactional
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
		assertThat(saved.getAsset())
			.extracting(FundAsset::getCode)
			.containsExactly("005930","004444");

		fundRepository.delete(saved);
	}

	@Test
	@DisplayName("특정 펀드의 기간별 보고서를 조회합니다")
	void getFundsByPeriod() {

		//given
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime submissionDate1 = now.minusYears(2);
		LocalDateTime submissionDate2 = now.minusYears(3);
		LocalDateTime submissionDate3 = now.minusYears(5);

		Fund fund1 = Fund.builder()
			.company("Test fund")
			.submissionDate(submissionDate1)
			.build();

		Fund fund2 = Fund.builder()
			.company("Test fund")
			.submissionDate(submissionDate2)
			.build();

		Fund fund3 = Fund.builder()
			.company("Test fund")
			.submissionDate(submissionDate3)
			.build();

		fundRepository.save(fund1);
		fundRepository.save(fund2);
		fundRepository.save(fund3);

		//when
		List<Fund> fundsByPeriod = fundRepository.getFundsByPeriod(fund1.getCompany(),3);

		//then
		assertThat(fundsByPeriod.get(0).getCompany()).isEqualTo("Test fund");
		assertThat(fundsByPeriod.size()).isEqualTo(2);

		fundRepository.delete(fund1);
		fundRepository.delete(fund2);
		fundRepository.delete(fund3);
	}

	@Test
	void getAllFunds() {
	}

	@Test
	void getFund() {
	}

	@Test
	void getTopHoldAndBuyAmount() {
	}

	@Test
	void getBeforeQuarter() {
	}

	@Test
	void getBeforeQuarterTopHoldAndBuyAmount() {
	}
}