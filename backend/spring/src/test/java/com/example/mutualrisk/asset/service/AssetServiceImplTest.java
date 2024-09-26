package com.example.mutualrisk.asset.service;

import static com.example.mutualrisk.asset.dto.AssetResponse.*;
import static java.time.LocalDateTime.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.example.mutualrisk.asset.dto.AssetRequest;
import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.entity.InterestAsset;
import com.example.mutualrisk.common.enums.Region;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetNewsRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.asset.repository.InterestAssetRepository;
import com.example.mutualrisk.common.config.QuerydslConfig;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;
import com.example.mutualrisk.common.enums.Market;
import com.example.mutualrisk.common.enums.Order;
import com.example.mutualrisk.common.enums.OrderCondition;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Import;

@ExtendWith(MockitoExtension.class)
@Import({QuerydslConfig.class})
class AssetServiceImplTest {

    @InjectMocks
    private AssetServiceImpl assetService;
    @Mock
    private AssetRepository assetRepository;
    @Mock
    private AssetHistoryRepository assetHistoryRepository;
    @Mock
    private InterestAssetRepository interestAssetRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private AssetNewsRepository assetNewsRepository;
    @Mock
    private ExchangeRatesRepository exchangeRatesRepository;

    @Test
    void searchByKeyword() {

    }

    @Test
    @DisplayName("유저가 존재하지 않는 경우 예외를 반환한다")
    void userInterestAssetUserException(){

        //given
        when(userRepository.findById(anyInt()))
            .thenReturn(Optional.empty());

        //when,then
        assertThatThrownBy(
            () -> assetService.getUserInterestAssets(0, OrderCondition.NAME, Order.ASC))
            .isInstanceOf(MutualRiskException.class)
            .hasMessage(ErrorCode.USER_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("유저가 선택한 자산이 존재하지 않는 경우 예외를 반환한다")
    void userInterestAssetNotExist(){

        //given
        User user = User.builder()
            .id(1)
            .nickname("조용수")
            .oauthId("12345-KAKAO")
            .email("sujipark2009@gmail.com")
            .build();

        when(userRepository.findById(anyInt()))
            .thenReturn(Optional.of(user));

        when(assetRepository.findById(anyInt()))
            .thenReturn(Optional.empty());

        //when,then
        assertThatThrownBy(
            () -> assetService.addInterestAsset(user.getId(), new AssetRequest.InterestAssetInfo(1)))
            .isInstanceOf(MutualRiskException.class)
            .hasMessage(ErrorCode.ASSET_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("유저의 관심자산을 정렬기준에 따라 조회할 수 있다")
    void getUserInterestAssets(){

        //given
        User user = User.builder()
            .id(1)
            .nickname("조용수")
            .oauthId("12345-KAKAO")
            .email("sujipark2009@gmail.com")
            .build();

        Asset asset1 = Asset.builder()
            .name("삼성전자")
            .code("005930")
            .region(Region.KR)
            .market(Market.KOSPI)
            .expectedReturn(0.41)
            .build();
        Asset asset2 = Asset.builder()
            .name("LG전자")
            .code("123456")
            .region(Region.KR)
            .market(Market.KOSPI)
            .expectedReturn(0.21)
            .build();

        Asset asset3 = Asset.builder()
            .name("애플")
            .code("AAPL")
            .region(Region.US)
            .market(Market.NASDAQ)
            .expectedReturn(0.15)
            .build();

        List<InterestAsset> userInterestAsset = new ArrayList<>();
        InterestAsset ia1 = InterestAsset.builder()
            .asset(asset1)
            .user(user)
            .build();

        InterestAsset ia2 = InterestAsset.builder()
            .asset(asset2)
            .user(user)
            .build();

        InterestAsset ia3 = InterestAsset.builder()
            .asset(asset3)
            .user(user)
            .build();

        userInterestAsset.add(ia1);
        userInterestAsset.add(ia2);
        userInterestAsset.add(ia3);

        AssetHistory mostRecentAssetHistory1 = AssetHistory.builder()
            .asset(asset1)
            .date(now())
            .price(1.1111)
            .build();

        AssetHistory secondMostAssetHistory1 = AssetHistory.builder()
            .asset(asset1)
            .date(now().minusDays(1))
            .price(1.023)
            .build();


        AssetHistory mostRecentAssetHistory2 = AssetHistory.builder()
            .asset(asset2)
            .date(now())
            .price(123.45)
            .build();

        AssetHistory secondMostAssetHistory2 = AssetHistory.builder()
            .asset(asset2)
            .date(now().minusDays(1))
            .price(134.63)
            .build();

        AssetHistory mostRecentAssetHistory3 = AssetHistory.builder()
            .asset(asset3)
            .date(now())
            .price(150.00)
            .build();

        AssetHistory secondMostAssetHistory3 = AssetHistory.builder()
            .asset(asset2)
            .date(now().minusDays(1))
            .price(101.34)
            .build();

        // Mock 설정
        when(userRepository.findById(anyInt()))
            .thenReturn(Optional.of(user));

        when(interestAssetRepository.findUserInterestAssets(any()))
            .thenReturn(userInterestAsset);

        when(assetHistoryRepository.findRecentTwoAssetHistory(asset1))
            .thenReturn(Arrays.asList(mostRecentAssetHistory1, secondMostAssetHistory1));

        when(assetHistoryRepository.findRecentTwoAssetHistory(asset2))
            .thenReturn(Arrays.asList(mostRecentAssetHistory2, secondMostAssetHistory2));

        when(assetHistoryRepository.findRecentTwoAssetHistory(asset3))
            .thenReturn(Arrays.asList(mostRecentAssetHistory3, secondMostAssetHistory3));

        when(assetNewsRepository.findByAssetIn(any(List.class)))
            .thenReturn(new ArrayList());

        when(exchangeRatesRepository.getRecentExchangeRate())
            .thenReturn(1300.0);

        // when : 기본 정렬 (디폴트 점검)
        ResponseWithData<AssetResultDto> userInterestAssetsByDefault = assetService.getUserInterestAssets(
            user.getId(), OrderCondition.NAME, Order.ASC);

        // then
        assertThat(userInterestAssetsByDefault.data().assets())
            .extracting(AssetInfo::name)
            .containsExactly(
                "LG전자",
                "삼성전자",
                "애플");

        // when : 이름 순 정렬 (내림차순)
        ResponseWithData<AssetResultDto> userInterestAssetsByNameDesc = assetService.getUserInterestAssets(
            user.getId(), OrderCondition.NAME, Order.DESC);

        assertThat(userInterestAssetsByNameDesc.data().assets())
            .extracting(AssetInfo::name)
            .containsExactly(
                "애플",
                "삼성전자",
                "LG전자"
            );

        // when : 수익률 순 정렬 (오름차순)
        ResponseWithData<AssetResultDto> userInterestAssetsByReturnsAsc = assetService.getUserInterestAssets(
            user.getId(), OrderCondition.RETURN, Order.ASC);

        assertThat(userInterestAssetsByReturnsAsc.data().assets())
            .extracting(AssetInfo::expectedReturn)
            .containsExactly(
                0.15,0.21,0.41
            );

        // when : 정렬 (name 순)
        ResponseWithData<AssetResultDto> userInterestAssets = assetService.getUserInterestAssets(
            user.getId(), OrderCondition.NAME, Order.ASC);

        // then
        assertThat(userInterestAssets.data().assetNum())
            .isEqualTo(3);

        assertThat(userInterestAssets.data().assets())
            .extracting(AssetInfo::name)
            .containsExactly(
                "LG전자",
                "삼성전자",
                "애플"
            );

        // when : 가격순 정렬 (내림차순)
        ResponseWithData<AssetResultDto> userInterestAssetsByPriceDesc = assetService.getUserInterestAssets(
            user.getId(), OrderCondition.PRICE, Order.DESC);

        assertThat(userInterestAssetsByPriceDesc.data().assets())
            .extracting(AssetInfo::name)
            .containsExactly(
                "애플", // price = 150.00
                "LG전자", // price = 123.45
                "삼성전자" // price = 1.1111
            );
    }

    @Test
    @DisplayName("유저는 관심종목을 추가할 수 있다.")
    void addInterestAsset(){
        //given
        User user = User.builder()
            .id(1)
            .nickname("조용수")
            .oauthId("12345-KAKAO")
            .email("sujipark2009@gmail.com")
            .build();

        Asset asset1 = Asset.builder()
            .id(1)
            .name("삼성전자")
            .code("005930")
            .region(Region.US)
            .expectedReturn(0.41)
            .build();

        List<InterestAsset> userInterestAsset = new ArrayList<>();
        InterestAsset ia1 = InterestAsset.builder()
            .asset(asset1)
            .user(user)
            .build();

        userInterestAsset.add(ia1);

        when(userRepository.findById(anyInt()))
            .thenReturn(Optional.of(user));

        when(assetRepository.findById(anyInt()))
            .thenReturn(Optional.of(asset1));

        AssetRequest.InterestAssetInfo assetInfo = new AssetRequest.InterestAssetInfo(-1);

        //when
        ResponseWithMessage res = assetService.addInterestAsset(user.getId(), assetInfo);

        //then
        assertThat(res.message()).isEqualTo("관심종목에 등록하였습니다");

        // save가 호출되었는지 확인
        verify(interestAssetRepository, times(1)).save(any(InterestAsset.class));

    }

}