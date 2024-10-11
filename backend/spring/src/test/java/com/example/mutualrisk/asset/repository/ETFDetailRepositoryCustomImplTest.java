package com.example.mutualrisk.asset.repository;

import static org.assertj.core.api.AssertionsForInterfaceTypes.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.ETFDetail;
import com.example.mutualrisk.common.config.QuerydslConfig;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({QuerydslConfig.class})
class ETFDetailRepositoryCustomImplTest {

	@Autowired
	private ETFDetailRepository etfDetailRepository;

	@Autowired
	private AssetRepository assetRepository;

	@Test
	@DisplayName("자산 ID로 ETF의 상세정보를 조회할 수 있다")
	void findByAssetId() {

		//given
		Asset asset = Asset.builder()
			.name("Test Asset")
			.code("ABC")
			.expectedReturn(0.0)
			.build();

		assetRepository.save(asset);
		ETFDetail etfDetail1 = ETFDetail.builder()
			.name("ETF Detail 1")
			.asset(asset)
			.build();

		etfDetailRepository.save(etfDetail1);

		//when
		List<ETFDetail> result = etfDetailRepository.findByAssetId(asset.getId());

		//then
		assertThat(result).hasSize(1);
		assertThat(result.get(0).getAsset().getId()).isEqualTo(asset.getId());
		assertThat(result).extracting(ETFDetail::getName).contains("ETF Detail 1");
	}
}