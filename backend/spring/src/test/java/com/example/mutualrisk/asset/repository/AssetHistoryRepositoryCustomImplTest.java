package com.example.mutualrisk.asset.repository;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
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
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.common.config.QuerydslConfig;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({QuerydslConfig.class})
class AssetHistoryRepositoryCustomImplTest {

	@Autowired
	private AssetRepository assetRepository;

	@Autowired
	private AssetHistoryRepository assetHistoryRepository;

	@Test
	@DisplayName("자산의 최근 2개의 종가를 구한다")
	void findRecentTwoAssetHistory() {
		//given
		Asset asset = Asset.builder()
			.name("삼성전자").expectedReturn(0.0).code("ABC")
			.build();

		assetRepository.save(asset);

		LocalDateTime now = LocalDateTime.now();

		AssetHistory history1 = AssetHistory.builder()
			.asset(asset).date(now).price(100.0)
			.build();

		AssetHistory history2 =
			AssetHistory.builder()
				.asset(asset).date(now.minusDays(1)).price(500.0)
				.build();

		AssetHistory history3 =
			AssetHistory.builder()
				.asset(asset).date(now.minusHours(1)).price(900.0)
				.build();

		assetHistoryRepository.save(history1);
		assetHistoryRepository.save(history2);
		assetHistoryRepository.save(history3);

		//when
		List<AssetHistory> recentTwoAssetHistory = assetHistoryRepository.findRecentTwoAssetHistory(asset);

		//then
		assertThat(recentTwoAssetHistory.size()).isEqualTo(2);
		assertThat(recentTwoAssetHistory.get(0)).isEqualTo(history1);
		assertThat(recentTwoAssetHistory.get(1)).isEqualTo(history3);

		assertThat(recentTwoAssetHistory).extracting(AssetHistory::getPrice).containsExactly(100.0,900.0);

	}

	@Test
	void findRecentHistoryOfAsset() {
	}

	@Test
	void findHistoryOfAssets() {
	}

	@Test
	void testFindRecentHistoryOfAsset() {
	}

	@Test
	@DisplayName("주어진 기간 사이의 자산의 종가를 반환한다")
	void findRecentHistoriesBetweenDates() {

		//given
		Asset asset = Asset.builder()
			.name("삼성전자").expectedReturn(0.0).code("ABC")
			.build();

		assetRepository.save(asset);

		LocalDateTime now = LocalDateTime.now().withNano(0);

		AssetHistory history1 =
			AssetHistory.builder()
			.asset(asset).date(now.minusDays(1)).price(100.0)
			.build();


		AssetHistory history2 =
			AssetHistory.builder()
				.asset(asset).date(now.minusDays(3)).price(500.0)
				.build();



		AssetHistory history3 =
			AssetHistory.builder()
				.asset(asset).date(now.minusDays(5)).price(900.0)
				.build();

		assetHistoryRepository.save(history1);
		assetHistoryRepository.save(history2);
		assetHistoryRepository.save(history3);

		//when
		LocalDateTime pastDate = now.minusDays(3);
		LocalDateTime targetDate = now.minusDays(1);

		System.out.println("history1.getDate() = " + history1.getDate());
		System.out.println("history2.getDate() = " + history2.getDate());

		System.out.println("pastDate = " + pastDate);
		System.out.println("targetDate = " + targetDate);

		//when
		List<AssetHistory> recentHistoriesBetweenDates = assetHistoryRepository.findRecentHistoriesBetweenDates(asset,
			pastDate, targetDate);

		//then
		assertThat(recentHistoriesBetweenDates.size()).isEqualTo(2);
		assertThat(recentHistoriesBetweenDates.get(0)).isEqualTo(history1);
		assertThat(recentHistoriesBetweenDates.get(1)).isEqualTo(history2);

		assertThat(recentHistoriesBetweenDates.get(0).getPrice()).isEqualTo(100.0);
		assertThat(recentHistoriesBetweenDates.get(1).getPrice()).isEqualTo(500.0);

	}

	@Test
	void findRecentHistoryOfAssetsBetweenDates() {


	}
}