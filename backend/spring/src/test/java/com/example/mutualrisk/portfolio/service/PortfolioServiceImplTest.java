package com.example.mutualrisk.portfolio.service;

import static java.time.LocalTime.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.context.annotation.Primary;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetCovariance;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.repository.AssetCovarianceRepository;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.enums.Market;
import com.example.mutualrisk.common.enums.Region;
import com.example.mutualrisk.common.fastapi.FastApiService;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.portfolio.dto.PortfolioRequest;
import com.example.mutualrisk.portfolio.dto.PortfolioRequest.PortfolioInitDto;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse.CalculatedPortfolio;
import com.example.mutualrisk.portfolio.entity.Portfolio;
import com.example.mutualrisk.portfolio.repository.PortfolioRepository;

@ExtendWith(MockitoExtension.class)
class PortfolioServiceImplTest {

	@Mock
	private FastApiService fastApiService;
	@Mock
	private AssetRepository assetRepository;
	@Mock
	private PortfolioRepository portfolioRepository;
	@Mock
	private AssetHistoryRepository assetHistoryRepository;
	@Mock
	private ExchangeRatesRepository exchangeRatesRepository;
	@Mock
	private AssetCovarianceRepository assetCovarianceRepository;
	@InjectMocks
	private PortfolioServiceImpl portfolioService;



	@Test
	@DisplayName("유저는 포트폴리오를 제작할 수 있다")
	@MockitoSettings(strictness = Strictness.LENIENT)
	void initPortfolio() {
		//given
		Integer userId = 1; // 유저 ID
		PortfolioInitDto initInfo = new PortfolioInitDto(
			"1번",3600000, Arrays.asList(34, 58, 79, 128, 3429),
			Arrays.asList(0.05, 0.05, 0.05, 0.05, 0.05),Arrays.asList(0.5, 0.5, 0.5, 0.5, 0.5),
			Arrays.asList(null, 0.2, null, 0.3,null)
		); //포트폴리오 이름,현금,구매할 자산들,제약조건1,제약조건2,확정비율


		Map<String, Object> fictionalPerformanceMap = new HashMap<>();
		fictionalPerformanceMap.put("expectedReturn", 0.1);
		fictionalPerformanceMap.put("volatility", 0.2);

		Map<String, Object> weightsMap = new HashMap<>();
		weightsMap.put("0", 0.2);
		weightsMap.put("1", 0.3);
		weightsMap.put("2", 0.5);

		// fastapi 모킹
		Map<String,Object> recommendResponse = new HashMap<>();
		CompletableFuture<Map<String, Object>> recommendRes = CompletableFuture.completedFuture(
			recommendResponse);
		when(fastApiService.getRecommendData(anyMap()))
			.thenReturn((Map<String, Object>)recommendRes);

		// 자산들
		Asset asset1 = Asset.builder().id(0).name("삼성전자").code("005930").expectedReturn(0.0).recentPrice(100.0).region(
			Region.KR).market(Market.KOSPI).build();
		Asset asset2 = Asset.builder().id(1).name("LG전자").code("066570").expectedReturn(0.0).recentPrice(500.0)
			.region(Region.KR).market(Market.KOSPI)
			.build();
		Asset asset3 = Asset.builder().id(2).name("Amazon").code("AMZN").expectedReturn(0.0).recentPrice(200.0)
			.region(Region.US).market(Market.NASDAQ)
			.build();

		// 공분산
		AssetCovariance ac1 = AssetCovariance.builder().asset1(asset1).asset2(asset1).covariance(1.1).build();
		AssetCovariance ac2 = AssetCovariance.builder().asset1(asset1).asset2(asset2).covariance(1.5).build();
		AssetCovariance ac3 = AssetCovariance.builder().asset1(asset1).asset2(asset3).covariance(1.9).build();
		AssetCovariance ac4 = AssetCovariance.builder().asset1(asset2).asset2(asset1).covariance(1.5).build();
		AssetCovariance ac5 = AssetCovariance.builder().asset1(asset2).asset2(asset2).covariance(2.0).build();
		AssetCovariance ac6 = AssetCovariance.builder().asset1(asset2).asset2(asset3).covariance(2.2).build();
		AssetCovariance ac7 = AssetCovariance.builder().asset1(asset3).asset2(asset1).covariance(1.9).build();
		AssetCovariance ac8 = AssetCovariance.builder().asset1(asset3).asset2(asset2).covariance(2.2).build();
		AssetCovariance ac9 = AssetCovariance.builder().asset1(asset3).asset2(asset3).covariance(1.7).build();


		// 공분산 모킹
		when(assetCovarianceRepository.findAllCovarianceIn(anyList()))
			.thenReturn(Arrays.asList(ac1,ac2,ac3,ac4,ac5,ac6,ac7,ac8,ac9));

		// 자산들 모킹
		List<Asset> assetList = List.of(asset1,asset2,asset3);
		when(assetRepository.findAllById(initInfo.assetIds()))
			.thenReturn(assetList);

		// 추천비중fastapi 모킹
		Map<String,Object> responseBody = new HashMap<>();
		responseBody.put("fictionalPerformance", fictionalPerformanceMap);
		responseBody.put("weights", weightsMap);
		when(fastApiService.sendPortfolioData(anyMap()))
			.thenReturn(responseBody);

		// 환율 뫀이
		when(exchangeRatesRepository.getRecentExchangeRate())
			.thenReturn(anyDouble());

		Portfolio portfolio = Portfolio.builder()
			.id("112312fadlkjakg4")
			.type("fund")
			.name("VANGUARD")
			.userId(1)
			.version(1)
			.isActive(true)
			.build();

		List<Portfolio> portfolioList = Arrays.asList(portfolio);

		// 포트폴리오 모킹
		when(portfolioRepository.getMyPortfolioList(userId))
			.thenReturn(portfolioList);

		// 종가정보
		LocalDateTime now = LocalDateTime.now();

		AssetHistory history1 = AssetHistory.builder()
			.asset(asset1).date(now).price(100.0)
			.build();
		AssetHistory history2 =
			AssetHistory.builder()
				.asset(asset2).date(now.minusDays(1)).price(500.0)
				.build();
		AssetHistory history3 =
			AssetHistory.builder()
				.asset(asset3).date(now.minusHours(1)).price(900.0)
				.build();

		// 종가정보 모킹
		List<AssetHistory> historyList = Arrays.asList(history1,history2,history3);
		when(assetHistoryRepository.findRecentHistoriesBetweenDates(any(Asset.class),any(LocalDateTime.class),any(LocalDateTime.class)))
			.thenReturn(historyList);

		//when
		ResponseWithData<CalculatedPortfolio> result = portfolioService.initPortfolio(
			userId, initInfo);

		//then
		assertThat(result.status()).isEqualTo(200);
		assertThat(result.message()).isEqualTo(""
			+ "포트폴리오 제작 미리보기 입니다");
	}
}