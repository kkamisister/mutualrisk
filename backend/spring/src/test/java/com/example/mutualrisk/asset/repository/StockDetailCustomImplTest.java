package com.example.mutualrisk.asset.repository;


import static org.assertj.core.api.Assertions.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.StockDetail;
import com.example.mutualrisk.common.config.QuerydslConfig;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({QuerydslConfig.class})
class StockDetailCustomImplTest {

	@Autowired
	private AssetRepository assetRepository;

	@Autowired
	private StockDetailRepository stockDetailRepository;

	@Test
	@DisplayName("자산ID로 국장 주식의 세부정보를 확인할 수 있다")
	void findByAssetId() {

		//given
		Asset asset = Asset.builder()
			.name("Test Asset")
			.code("ABC")
			.expectedReturn(0.0)
			.build();

		assetRepository.save(asset);

		StockDetail stockDetail = StockDetail.builder()
			.asset(asset)
			.per("10배")
			.pbr("20배")
			.eps("30배")
			.marketValue("299303")
			.build();

		stockDetailRepository.save(stockDetail);

		//when
		StockDetail stockDetail1 = stockDetailRepository.findByAssetId(asset.getId()).get();

		//then
		assertThat(stockDetail1.getAsset().getId()).isEqualTo(asset.getId());
		assertThat(stockDetail1.getPbr()).isEqualTo("20배");
		assertThat(stockDetail1.getMarketValue()).isEqualTo("299303");

	}
}