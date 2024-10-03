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

import java.time.LocalDateTime;
import java.util.List;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetNews;
import com.example.mutualrisk.asset.entity.InterestAsset;
import com.example.mutualrisk.asset.entity.News;
import com.example.mutualrisk.common.config.QuerydslConfig;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({QuerydslConfig.class})
class AssetNewsRepositoryCustomImplTest {

	@Autowired
	private AssetNewsRepository assetNewsRepository;

	@Autowired
	private AssetRepository assetRepository;

	@Autowired
	private NewsRepository newsRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private InterestAssetRepository interestAssetRepository;

	@Test
	@DisplayName("유저의 관심자산에 있는 뉴스를 최신순으로 조회할 수 있다")
	void findByAssetIn() {
		//given
		User user = User.builder()
			.nickname("조용수")
			.oauthId("12345-KAKAO")
			.email("sujipark2009@gmail.com")
			.build();

		userRepository.save(user);

		Asset asset1 = Asset.builder().code("ABC").name("삼성전자").expectedReturn(0.0).build();
		Asset asset2 = Asset.builder().code("BCD").name("LG전자").expectedReturn(0.0).build();

		assetRepository.save(asset1);
		assetRepository.save(asset2);


		InterestAsset ia1 = InterestAsset.builder()
			.asset(asset1)
			.user(user)
			.build();

		InterestAsset ia2 = InterestAsset.builder()
			.asset(asset2)
			.user(user)
			.build();

		interestAssetRepository.save(ia1);
		interestAssetRepository.save(ia2);

		LocalDateTime now = LocalDateTime.now();

		News news1 = News.builder()
			.title("삼성전자채용소식")
			.content("삼성전자 대규모 채용")
			.publishedAt(now)
			.build();

		News news2 = News.builder()
			.title("LG전자채용소식")
			.content("LG전자 대규모 채용")
			.publishedAt(now.minusDays(1L))
			.build();

		newsRepository.saveAll(List.of(news1,news2));

		AssetNews assetNews1 = AssetNews.builder()
			.news(news1)
			.asset(asset1)
			.build();

		AssetNews assetNews2 = AssetNews.builder()
			.news(news2)
			.asset(asset2)
			.build();

		assetNewsRepository.save(assetNews1);
		assetNewsRepository.save(assetNews2);

		List<Asset> userInterestAssets = interestAssetRepository.findUserInterestAssets(user)
			.stream().map(InterestAsset::getAsset).toList();

		//when
		List<AssetNews> assetNews = assetNewsRepository.findByAssetIn(userInterestAssets);

		//then
		assertThat(assetNews.size()).isEqualTo(2);
		assertThat(assetNews).extracting(AssetNews::getNews)
			.extracting(News::getTitle)
			.containsExactly("삼성전자채용소식","LG전자채용소식");

	}

	@Test
	@DisplayName("자산에 관련된 뉴스를 조회할 수 있다")
	void findByAsset() {

		Asset asset = Asset.builder().code("ABC").name("삼성전자").expectedReturn(0.0).build();
		assetRepository.save(asset);

		LocalDateTime now = LocalDateTime.now();

		News news1 = News.builder()
			.title("삼성전자채용소식")
			.content("삼성전자 대규모 채용")
			.publishedAt(now.minusDays(1L))
			.build();

		News news2 = News.builder()
			.title("LG전자채용소식")
			.content("LG전자 대규모 채용")
			.publishedAt(now)
			.build();

		newsRepository.saveAll(List.of(news1,news2));

		AssetNews assetNews1 = AssetNews.builder()
			.news(news1)
			.asset(asset)
			.build();

		AssetNews assetNews2 = AssetNews.builder()
			.news(news2)
			.asset(asset)
			.build();

		assetNewsRepository.save(assetNews1);
		assetNewsRepository.save(assetNews2);

		//when
		List<AssetNews> findAssetNews = assetNewsRepository.findByAsset(asset);

		//then
		assertThat(findAssetNews.size()).isEqualTo(2);
		assertThat(findAssetNews).extracting(AssetNews::getNews)
			.extracting(News::getTitle)
			.containsExactly("LG전자채용소식","삼성전자채용소식");


	}

	@Test
	void findAllByNews() {
	}
}