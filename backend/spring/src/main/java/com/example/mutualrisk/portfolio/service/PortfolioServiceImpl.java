package com.example.mutualrisk.portfolio.service;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.asset.service.AssetHistoryService;
import com.example.mutualrisk.common.dto.CommonResponse.*;
import com.example.mutualrisk.common.enums.PerformanceMeasure;
import com.example.mutualrisk.common.enums.Region;
import com.example.mutualrisk.common.enums.TimeInterval;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.common.util.DateUtil;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;
import com.example.mutualrisk.portfolio.entity.Portfolio;
import com.example.mutualrisk.portfolio.entity.PortfolioAsset;
import com.example.mutualrisk.portfolio.entity.PortfolioPurchaseInfo;
import com.example.mutualrisk.portfolio.repository.PortfolioRepository;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
    private final AssetHistoryService assetHistoryService;

    private final PortfolioRepository portfolioRepository;
    private final AssetRepository assetRepository;
    private final AssetHistoryRepository assetHistoryRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final UserRepository userRepository;

    private final DateUtil dateUtil;


    @Override
    public ResponseWithData<PortfolioResultDto> getPortfolioInfo(Integer userId) {

        // 1. userId를 이용해서, mongoDB에서 데이터를 검색해 가져온다
        Portfolio portfolio = portfolioRepository.getMyPortfolio(userId);

        // 2-1. userId에 해당하는 포트폴리오가 없을 경우
        if (portfolio == null) {
            return buildNoPortfolioResponse();
        }
        // 2-2. userId에 해당하는 포트폴리오가 존재할 경우
        List<PortfolioAsset> portfolioAssetList = portfolio.getAsset();
        List<Asset> assetList = getAssetsFromPortfolio(portfolioAssetList);
        // 자산들의 현재 금액을 저장하는 리스트
        List<Double> purchaseAmounts = calculatePurchaseAmounts(portfolioAssetList, assetList);
        // 포트폴리오에 속해 있는 자산 리스트

        double totalAmount = purchaseAmounts.stream()
            .mapToDouble(Double::doubleValue)
            .sum();

        // 3. 각 값의 비율을 계산해서 weights 리스트에 추가
        List<Double> weights = calculateWeights(purchaseAmounts, totalAmount);

        List<PortfolioAssetInfo> portfolioAssetInfoList = buildPortfolioAssetInfoList(assetList, weights, portfolioAssetList);

        PortfolioPerformance portfolioPerformance = getPortfolioPerformance(assetList, weights, totalAmount);

        return buildNoPortfolioResponse(portfolio, portfolioAssetInfoList, portfolioPerformance);
    }

    /**
     * 전체 유저를 대상으로 포트폴리오의 비중을 재계산하여, +-10%p 이상의 변동이 있거나
     * 유저가 설정한 상한,하한을 초과한 종목이 있을경우 유저에게 메일을 보낸다
     * @return
     */
    @Override
    public ResponseWithMessage sendRefreshMail() {

        // 전체 유저 목록을 가지고온다
        List<User> users = userRepository.findAll();

        // 각 유저의 포트폴리오를 가지고온다
        for(User user: users){
            Portfolio portfolio = portfolioRepository.getMyPortfolio(user.getId());
            // 유저의 포트폴리오가 없는경우 패스
            if(ObjectUtils.isEmpty(portfolio))continue;

            List<PortfolioAsset> assets = portfolio.getAsset();

            // 오늘일자 기준 포트폴리오 자산의 (자산코드,총가격)
            Map<String, Double> recentAssetPrice = getTodayValueOfHoldings(assets);

            for(Entry<String,Double> entry: recentAssetPrice.entrySet()){
                log.warn("CODE1 : {}", entry.getKey());
                log.warn("PRICE: {}", entry.getValue());
            }

            // 오늘일자 기준 총 자산 가치 계산
            Double totalRecentValueOfHolding = recentAssetPrice.values().stream()
                .mapToDouble(Double::doubleValue)
                .sum();

            log.warn("TOTAL RECENT VALUE : {}", totalRecentValueOfHolding);

            // 오늘일자 기준 (종목, 비중) 계산
            Map<String, Double> recentAssetWeights = getWeights(recentAssetPrice, totalRecentValueOfHolding);

            for(Entry<String,Double> recentAssetWeightEntry: recentAssetWeights.entrySet()){

                log.warn("CODE2 : {}", recentAssetWeightEntry.getKey());
                log.warn("WEIGHT : {}", recentAssetWeightEntry.getValue());

            }
            /**
             * 구매 당시 비중과 오늘날의 비중을 비교하여
             * 1. 포트폴리오의 lower bound 를 넘은 종목, upper bound를 넘은 종목을 찾는다
             * 2. +-10%p의 차이가 존재하는 자산을 찾는다
             */

            // 종목 코드와 비중을 비교하기 위해 자산 리스트와 포트폴리오 정보를 매핑
            List<String> assetCodes = assets.stream()
                .map(PortfolioAsset::getCode)
                .toList();

            // lowerBound, upperBound, weights와 최근 비중을 비교
            for (int i = 0; i < assetCodes.size(); i++) {
                String code = assetCodes.get(i);
                Double recentWeight = recentAssetWeights.get(code); // 최근 비중
                Double lowerBound = portfolio.getLowerBound().get(i); // 포트폴리오의 하한선
                Double upperBound = portfolio.getUpperBound().get(i); // 포트폴리오의 상한선
                Double originWeight = portfolio.getWeights().get(i); // 포트폴리오의 기존 비중

                // 1. lower bound와 upper bound를 넘는 종목 찾기
                if (recentWeight < lowerBound) {
                    log.warn(code+"의 비중이 lower bound를 넘었습니다.");
                } else if (recentWeight > upperBound) {
                    log.warn(code+"의 비중이 upper bound를 넘었습니다.");
                }

                // 2. 구매 당시 비중과 오늘 비중이 ±10%p 이상 차이나는 자산 찾기
                if (Math.abs(recentWeight - originWeight) > 10.0) {
                    log.warn(code + "의 비중 차이가 ±10%p 이상입니다.");
                }
            }
            // 알람 메일을 보내야할 종목에 대해 메일을 발송한다
        }
        return new ResponseWithMessage(HttpStatus.OK.value(),"메일발송에 성공하였습니다");
    }

    @Override
    public PortfolioBacktestingResultDto getUserPortfolioPerformance(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId) {
        // 1. userId를 이용해서, mongoDB에서 데이터를 검색해 가져온다
        Portfolio portfolio = portfolioRepository.getMyPortfolio(userId);

        // 2. AssetList 구하기
        List<PortfolioAsset> portfolioAssetList = portfolio.getAsset();

        List<Integer> assetIdList = portfolioAssetList.stream()
            .map(PortfolioAsset::getAssetId)
            .toList();

        List<Asset> assetList = assetRepository.findByIds(assetIdList);

        // 3. 포트폴리오 백테스팅 결과 저장
        LocalDateTime recentDate = LocalDateTime.now().minusDays(1).withHour(0);

        for (int dDate = 30; dDate >= 1; dDate--) {
            LocalDateTime targetDate = dateUtil.getPastDate(recentDate, timeInterval, dDate);
            Long valuation = getValuation(portfolioAssetList, assetList, targetDate);
        }
        return null;
    }

    // 백테스팅 그래프를 위한 메서드
    /**
     *
     * @param portfolioAssetList : 포트폴리오 자산 관련 정보를 담는 list. 자산 구매량 정보를 담고 있다
     * @param assetList : 자산 Entity를 담고 있는 list
     * @param targetDate : valuation 를 구하기 원하는 날짜
     * @return : targetDate 기준 포트폴리오 valuation
     */
    private Long getValuation(List<PortfolioAsset> portfolioAssetList, List<Asset> assetList, LocalDateTime targetDate) {
//        assetHistoryService.getAssetPrices()
        return null;
    }

    private Map<String, Double> getTodayValueOfHoldings(List<PortfolioAsset> assets) {
        return assets.stream()
            .collect(Collectors.toMap(
                PortfolioAsset::getCode,
                asset -> {
                    // 오늘 일자의 자산 가격 가져오기
                    Asset todayAsset = assetRepository.findById(
                        asset.getAssetId()).orElseThrow(()  -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

                    log.warn("recentAssetPrice : {}",todayAsset.getRecentPrice());

                    double totalPurchaseQuantity = asset.getPurchaseInfos().stream()
                        .map(PortfolioPurchaseInfo::getPurchaseQuantity)
                        .mapToDouble(Double::valueOf)
                        .sum();

                    return totalPurchaseQuantity * todayAsset.getRecentPrice();
                },
                Double::sum
            ));
    }

    private static Map<String, Double> getWeights(Map<String, Double> assetPrice, Double totalValueOfHolding) {
        return assetPrice.entrySet().stream()
            .collect(Collectors.toMap(
                Entry::getKey,
                entry -> entry.getValue() * 100.0 / totalValueOfHolding
            ));
    }

    private ResponseWithData<PortfolioResultDto> buildNoPortfolioResponse(Portfolio portfolio, List<PortfolioAssetInfo> portfolioAssetInfoList, PortfolioPerformance portfolioPerformance) {
        PortfolioInfo portfolioInfo = PortfolioInfo.builder()
            .portfolioId(portfolio.getId())
            .performance(portfolioPerformance)
            .assets(portfolioAssetInfoList)
            .build();

        PortfolioResultDto portfolioResultDto = PortfolioResultDto.builder()
            .hasPortfolio(Boolean.TRUE)
            .portfolio(portfolioInfo)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(), "정상적인 응답을 반환하였습니다", portfolioResultDto);
    }

    private static List<PortfolioAssetInfo> buildPortfolioAssetInfoList(List<Asset> assetList, List<Double> weights, List<PortfolioAsset> portfolioAssetList) {

        return IntStream.range(0, assetList.size())
            .mapToObj(i -> PortfolioAssetInfo.of(portfolioAssetList.get(i), assetList.get(i), weights.get(i)))
            .toList();
    }

    private static List<Double> calculateWeights(List<Double> purchaseAmounts, double totalAmount) {
        return purchaseAmounts.stream()
            .map(amount -> amount / totalAmount)
            .toList();
    }

    private List<Double> calculatePurchaseAmounts(List<PortfolioAsset> portfolioAssetList, List<Asset> assetList) {
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        return IntStream.range(0, portfolioAssetList.size())
            .mapToObj(i -> {
                PortfolioAsset portfolioAsset = portfolioAssetList.get(i);
                Asset asset = assetList.get(i);
                double price = portfolioAsset.getTotalPurchaseAmount() * asset.getRecentPrice();
                if (asset.getRegion().equals(Region.US)) {
                    price *= recentExchangeRate;
                }
                return price;
            })
            .collect(Collectors.toList());
    }

    private List<Asset> getAssetsFromPortfolio(List<PortfolioAsset> portfolioAssetList) {
        return portfolioAssetList.stream()
            .map(portfolioAsset -> assetRepository.findById(portfolioAsset.getAssetId())
                .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND)))
            .collect(Collectors.toList());
    }

    // 포트폴리오가 없을 경우 응답을 생성하는 메서드
    private ResponseWithData<PortfolioResultDto> buildNoPortfolioResponse() {
        PortfolioResultDto portfolioResultDto = PortfolioResultDto.builder()
            .hasPortfolio(Boolean.FALSE)
            .build();
        return new ResponseWithData<>(HttpStatus.OK.value(), "유저가 포트폴리오를 아직 만들지 않은 상태입니다", portfolioResultDto);
    }

    private PortfolioPerformance getPortfolioPerformance(List<Asset> assetList, List<Double> weights, double totalAmount) {
        // todo: expected_return, covariance_matrix가 데이터 적재가 덜 되어서 구하는 로직을 추가하지 않음. 추후 추가 필요

        return PortfolioPerformance.builder()
            .valuation(totalAmount)
            .build();
    }
}
