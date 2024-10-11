package com.example.mutualrisk.asset.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.InterestAsset;
import com.example.mutualrisk.common.enums.Order;
import com.example.mutualrisk.common.enums.OrderCondition;
import com.example.mutualrisk.common.enums.Region;
import com.example.mutualrisk.common.config.QuerydslConfig;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import jakarta.persistence.EntityManager;

@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({QuerydslConfig.class})
class InterestAssetRepositoryTest {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private InterestAssetRepository interestAssetRepository;
	@Autowired
	private AssetRepository assetRepository;
	@Autowired
	private EntityManager em;

	@BeforeEach
	void setUp(){
		interestAssetRepository.deleteAllInBatch();
		userRepository.deleteAllInBatch();
		assetRepository.deleteAllInBatch();

		em.flush();
		em.clear();
	}


	@Test
	@DisplayName("유저의 관심자산을 조회할 수 있다")
	void interestAssetRepositoryTest() {

		//given
		User user = User.builder()
			// .id(1)
			.nickname("조용수")
			.oauthId("12345-KAKAO")
			.email("sujipark2009@gmail.com")
			.build();

		userRepository.save(user);

		Asset asset1 = Asset.builder()
			// .id(1)
			.name("삼성전자")
			.code("005930")
			.region(Region.US)
			.expectedReturn(1.1)
			.build();

		Asset asset2 = Asset.builder()
			// .id(2)
			.name("LG전자")
			.code("123456")
			.region(Region.KR)
			.expectedReturn(11105.0)
			.build();

		assetRepository.save(asset1);
		assetRepository.save(asset2);

		InterestAsset ia1 = InterestAsset.builder()
			// .id(1)
			.asset(asset1)
			.user(user)
			.build();

		InterestAsset ia2 = InterestAsset.builder()
			// .id(2)
			.asset(asset2)
			.user(user)
			.build();

		interestAssetRepository.save(ia1);
		interestAssetRepository.save(ia2);

		//when
		List<InterestAsset> userInterestAsset = interestAssetRepository.findUserInterestAssets(user);

		//then
		assertThat(userInterestAsset.size())
			.isEqualTo(2);

		assertThat(userInterestAsset)
			.extracting(InterestAsset::getAsset)
			.extracting(Asset::getCode)
			.containsExactly(
				"005930","123456"
			);
	}

	@Test
	@DisplayName("유저의 관심종목에 없는 종목을 조회하면 예외를 반환한다.")
	void findInterestAssetNotExist(){
		//given
		User user = User.builder()
			// .id(1)
			.nickname("조용수")
			.oauthId("12345-KAKAO")
			.email("sujipark2009@gmail.com")
			.build();

		userRepository.save(user);

		Asset asset1 = Asset.builder()
			// .id(1)
			.name("삼성전자")
			.code("005930")
			.region(Region.US)
			.expectedReturn(1.1)
			.build();
		Asset asset2 = Asset.builder()
			// .id(2)
			.name("LG전자")
			.code("123456")
			.region(Region.KR)
			.expectedReturn(11105.0)
			.build();

		Asset asset3 = Asset.builder()
			// .id(3)
			.name("SKC&C")
			.code("366633")
			.region(Region.KR)
			.expectedReturn(44.0)
			.build();

		assetRepository.save(asset1);
		assetRepository.save(asset2);
		assetRepository.save(asset3);

		InterestAsset ia1 = InterestAsset.builder()
			// .id(1)
			.asset(asset1)
			.user(user)
			.build();

		InterestAsset ia2 = InterestAsset.builder()
			// .id(2)
			.asset(asset2)
			.user(user)
			.build();

		interestAssetRepository.save(ia1);
		interestAssetRepository.save(ia2);

		//then
		assertThatThrownBy(
			() -> interestAssetRepository.findUserInterestAsset(user, asset3)
				.orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND_IN_USER_LIST)))
			.isInstanceOf(MutualRiskException.class)
			.hasMessage(ErrorCode.ASSET_NOT_FOUND_IN_USER_LIST.getMessage());
	}

	@Test
	@DisplayName("유저의 관심종목에 해당 자산이 있는지 조회할 수 있다.")
	void findInterestAssetByAsset(){
		//given
		User user = User.builder()
			// .id(1)
			.nickname("조용수")
			.oauthId("12345-KAKAO")
			.email("sujipark2009@gmail.com")
			.build();

		userRepository.save(user);

		Asset asset1 = Asset.builder()
			// .id(1)
			.name("삼성전자")
			.code("005930")
			.region(Region.US)
			.expectedReturn(1.1)
			.build();
		Asset asset2 = Asset.builder()
			// .id(2)
			.name("LG전자")
			.code("123456")
			.region(Region.KR)
			.expectedReturn(11105.0)
			.build();

		Asset asset3 = Asset.builder()
			// .id(3)
			.name("SKC&C")
			.code("366633")
			.region(Region.KR)
			.expectedReturn(44.0)
			.build();

		assetRepository.save(asset1);
		assetRepository.save(asset2);

		InterestAsset ia1 = InterestAsset.builder()
			// .id(1)
			.asset(asset1)
			.user(user)
			.build();

		InterestAsset ia2 = InterestAsset.builder()
			// .id(2)
			.asset(asset2)
			.user(user)
			.build();

		interestAssetRepository.save(ia1);
		interestAssetRepository.save(ia2);

		//when
		InterestAsset userInterestAsset = interestAssetRepository.findUserInterestAsset(user, asset1)
			.orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND_IN_USER_LIST));

		//then
		assertThat(userInterestAsset.getAsset().getName())
			.isEqualTo("삼성전자");
	}

	@Test
	@DisplayName("유저의 관심종목에서 자산을 삭제할 수 있다.")
	void interestAssetDelete(){
		//given
		User user = User.builder()
			// .id(1)
			.nickname("조용수")
			.oauthId("12345-KAKAO")
			.email("sujipark2009@gmail.com")
			.build();

		userRepository.save(user);

		Asset asset1 = Asset.builder()
			// .id(1)
			.name("삼성전자")
			.code("005930")
			.region(Region.US)
			.expectedReturn(1.1)
			.build();
		Asset asset2 = Asset.builder()
			// .id(2)
			.name("LG전자")
			.code("123456")
			.region(Region.KR)
			.expectedReturn(11105.0)
			.build();

		assetRepository.save(asset1);
		assetRepository.save(asset2);

		InterestAsset ia1 = InterestAsset.builder()
			// .id(1)
			.asset(asset1)
			.user(user)
			.build();

		InterestAsset ia2 = InterestAsset.builder()
			// .id(2)
			.asset(asset2)
			.user(user)
			.build();

		interestAssetRepository.save(ia1);
		interestAssetRepository.save(ia2);


		//when
		List<InterestAsset> userInterestAsset = interestAssetRepository.findUserInterestAssets(user);

		//then
		assertThat(userInterestAsset.size())
			.isEqualTo(2);

		interestAssetRepository.deleteById(ia1.getId());

		//when
		List<InterestAsset> userInterestAssetAfterDelete = interestAssetRepository.findUserInterestAssets(user);

		//then
		assertThat(userInterestAssetAfterDelete.size())
			.isEqualTo(1);

		assertThat(userInterestAssetAfterDelete)
			.extracting(InterestAsset::getAsset)
			.extracting(Asset::getName)
			.containsExactly("LG전자");
	}

}