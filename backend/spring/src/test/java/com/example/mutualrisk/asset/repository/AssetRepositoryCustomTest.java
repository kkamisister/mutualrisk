package com.example.mutualrisk.asset.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.common.config.QuerydslConfig;
import com.example.mutualrisk.industry.entity.Industry;
import com.example.mutualrisk.sector.entity.Sector;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({QuerydslConfig.class})
class AssetRepositoryCustomTest {

	@Autowired
	private AssetRepository assetRepository;

	@Test
	@DisplayName("키워드로 자산을 검색할 수 있다")
	void searchByKeyword() {

		// given
		Asset asset2 = Asset.builder().name("LG전자").code("066570").expectedReturn(0.0).build();
		Asset asset1 = Asset.builder().name("삼성전자").code("005930").expectedReturn(0.0).build();
		Asset asset3 = Asset.builder().name("Amazon").code("AMZN").expectedReturn(0.0).build();
		Asset asset4 = Asset.builder().name("Apple").code("AAPL").expectedReturn(0.0).build();
		Asset asset5 = Asset.builder().name("Intel").code("INTEL").expectedReturn(0.0).build();
		Asset asset6 = Asset.builder().name("HOME").code("HOME").expectedReturn(0.0).build();
		Asset asset7 = Asset.builder().name("WANT").code("WANT").expectedReturn(0.0).build();
		Asset asset8 = Asset.builder().name("GO").code("GO").expectedReturn(0.0).build();
		Asset asset9 = Asset.builder().name("NOW").code("NOW").expectedReturn(0.0).build();
		Asset asset10 = Asset.builder().name("DESK").code("DESK").expectedReturn(0.0).build();
		Asset asset11 = Asset.builder().name("Chair").code("Chair").expectedReturn(0.0).build();


		assetRepository.save(asset1);assetRepository.save(asset2);assetRepository.save(asset3);assetRepository.save(asset4);assetRepository.save(asset5);
		assetRepository.save(asset6);assetRepository.save(asset7);assetRepository.save(asset8);assetRepository.save(asset9);assetRepository.save(asset10);assetRepository.save(asset11);

		//when
		String keyword = "전자";
		List<Asset> results = assetRepository.searchByKeyword(keyword);

		//then
		assertThat(results).hasSizeLessThanOrEqualTo(10);

		assertThat(results.get(0).getName()).isEqualTo("삼성전자");
		assertThat(results.get(1).getName()).isEqualTo("LG전자");
		assertThat(results.size()).isEqualTo(2);
	}

	@Test
	@DisplayName("정확히 매칭되는 자산이 최우선적으로 반환된다")
	void testExactMatchPriority() {
		// given
		Asset exactMatchAsset = Asset.builder().name("ExactMatch").code("EXACT").expectedReturn(0.0).build();
		Asset partialMatchAsset = Asset.builder().name("Exact").code("EXCT").expectedReturn(0.0).build();
		assetRepository.save(exactMatchAsset);
		assetRepository.save(partialMatchAsset);

		// when
		String keyword = "ExactMatch";
		List<Asset> result = assetRepository.searchByKeyword(keyword);

		// then
		// 정확히 매칭된 자산이 가장 첫 번째로 나와야 함
		assertThat(result.size()).isEqualTo(1);
		assertThat(result.get(0).getName()).isEqualTo("ExactMatch");
	}

	@Test
	void findAssetListWithIndustryAndSectorByIds() {


	}

	@Test
	void findAssetsNotInList() {
	}
}