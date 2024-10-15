package com.example.mutualrisk.portfolio.service;

import static com.example.mutualrisk.common.constants.Constants.*;

import com.example.mutualrisk.asset.dto.AssetResponse.*;
import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetCovariance;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.repository.AssetCovarianceRepository;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.asset.service.AssetHistoryService;
import com.example.mutualrisk.asset.service.AssetService;
import com.example.mutualrisk.common.client.MutualRiskClient;
import com.example.mutualrisk.common.constants.BenchMark;
import com.example.mutualrisk.common.constants.MailTemplate;
import com.example.mutualrisk.common.dto.CommonResponse.*;
import com.example.mutualrisk.common.enums.Market;
import com.example.mutualrisk.common.enums.PerformanceMeasure;
import com.example.mutualrisk.common.email.dto.EmailMessage;
import com.example.mutualrisk.common.email.service.EmailService;
import com.example.mutualrisk.common.enums.Region;
import com.example.mutualrisk.common.enums.TimeInterval;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.fastapi.FastApiService;
import com.example.mutualrisk.common.redis.repository.RedisHashRepository;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.common.util.DateUtil;
import com.example.mutualrisk.fund.dto.FundResponse.SectorInfo;
import com.example.mutualrisk.portfolio.dto.PortfolioRequest.*;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;
import com.example.mutualrisk.portfolio.entity.*;
import com.example.mutualrisk.portfolio.repository.PortfolioRepository;
import com.example.mutualrisk.sector.entity.Sector;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
    private final AssetService assetService;
    private final AssetHistoryService assetHistoryService;

    private final PortfolioRepository portfolioRepository;
    private final AssetRepository assetRepository;
    private final AssetHistoryRepository assetHistoryRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final UserRepository userRepository;
    private final AssetCovarianceRepository assetCovarianceRepository;
    private final RedisHashRepository redisHashRepository;

    private final FastApiService fastApiService;


    private final DateUtil dateUtil;

    // 메일발송을 위한 서비스
    private final EmailService emailService;

    // WebClient Component
    private final MutualRiskClient mutualRiskClient;


    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<PortfolioResultDto> getPortfolioInfo(Integer userId, String portfolioId) {

        // 1. userId를 이용해서, mongoDB에서 데이터를 검색해 가져온다
        Portfolio portfolio = getMyPortfolioById(userId, portfolioId);

        // 2-1. userId에 해당하는 포트폴리오가 없을 경우
        if (portfolio == null) {
            return buildPortfolioResponse();
        }
        // 2-2. userId에 해당하는 포트폴리오가 존재할 경우
        List<PortfolioAsset> portfolioAssetList = portfolio.getAsset();
        List<Asset> assetList = getAssetsFromPortfolio(portfolioAssetList);
        // 자산들의 구매 금액을 저장하는 리스트
        List<Double> assetValuationList = getAssetValuationList(portfolioAssetList, assetList);
        // 포트폴리오에 속해 있는 자산 리스트

        double totalValuation = assetValuationList.stream()
            .mapToDouble(Double::doubleValue)
            .sum();

        // 3. 각 값의 비율을 계산해서 weights 리스트에 추가
        List<Double> weights = calculateWeights(assetValuationList, totalValuation);

        // 4. buildPortfolioResponse 객체 만들기
        // 4-1. 현재 포트폴리오의 퍼포먼스 구하기
        PortfolioPerformance portfolioPerformance = getPortfolioPerformance(assetList, weights, totalValuation);

        // 4-2. 포트폴리오에 저장된 자산들의 정보 구하기
        List<PortfolioAssetInfo> portfolioAssetInfoList = getPortfolioAssetInfos(portfolio);
        // 4-3. 새롭게 추천해 주는 자산들의 정보 구하기
        // 추가했을 때, 샤프 비율의 증가량(sharpeRatioChange)이 큰 순서대로 정렬함
        List<PortfolioRecommendResultDto> recommendAssetResponseResultDtoList = getRecommendAssetResponseResultDto(portfolio, portfolioPerformance).stream()
            .sorted(Comparator.comparingDouble(PortfolioRecommendResultDto::sharpeRatioChange).reversed())
            .toList();

        return buildPortfolioResponse(totalValuation, portfolio, portfolioAssetInfoList, portfolioPerformance, recommendAssetResponseResultDtoList);
    }

    private List<PortfolioRecommendResultDto> getRecommendAssetResponseResultDto(Portfolio portfolio, PortfolioPerformance portfolioPerformance) {
        // 1. 현재 유저 포트폴리오에 있는 추천 자산 목록을 가져 온다
        // 추천 자산 목록은 assetId순으로 정렬되어 있음이 보장되어 있다
        List<RecommendAsset> recommendAssets = portfolio.getRecommendAssets();

        // recommendAssets가 null이면 -> 빈 리스트를 반환
        if (recommendAssets.isEmpty()) return new ArrayList<>();

        // 2. recommendAsset에 포함된 assetId들을 반환
        List<Integer> assetIds = recommendAssets.stream()
            .map(RecommendAsset::getAssetId)
            .toList();

        // 3. assetId에 해당되는 asset들을 반환
        List<Asset> assetList = assetRepository.findAllById(assetIds);

        // 가정: recommendAssets 리스트에 AssetId 필드가 있음
        List<Integer> recommendAssetIds = recommendAssets.stream()
            .map(RecommendAsset::getAssetId)
            .toList();


        // AssetList를 recommendAssetIds 순서에 맞게 정렬
        Map<Integer, Asset> assetMap = assetList.stream()
            .collect(Collectors.toMap(Asset::getId, asset -> asset));

        List<Asset> sortedAssetList = recommendAssetIds.stream()
            .map(assetMap::get)
            .toList();

        // 4. asset -> assetInfo로 변경한다
        List<AssetInfo> assetInfoList = getAssetInfosFrom(assetList);

        // 5. assetInfoList, valuationList, weights를 이용하여 portfolioAssetInfoList 생성
        List<PortfolioRecommendResultDto> portfolioAssetInfoList = IntStream.range(0, assetInfoList.size())
            .mapToObj(i -> PortfolioRecommendResultDto.of(assetInfoList.get(i), recommendAssets.get(i), portfolioPerformance))
            .toList();
        return portfolioAssetInfoList;
    }

    /**
     * 전체 유저를 대상으로 포트폴리오의 비중을 재계산하여, +-10%p 이상의 변동이 있거나
     * 유저가 설정한 상한,하한을 초과한 종목이 있을경우 유저에게 메일을 보낸다
     * 매일 자정에 전체 유저를 검사한다
     */
    @Override
    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void sendRefreshMail() {

        // 전체 유저 목록을 가지고온다
        List<User> users = userRepository.findAll();

        log.warn("users : {}",users);

        // 각 유저의 포트폴리오를 가지고온다
        for(User user: users){
            Portfolio curPortfolio = getCurrentPortfolio(user);

            // 유저의 포트폴리오가 없는경우 패스
            if(ObjectUtils.isEmpty(curPortfolio))continue;

            List<PortfolioAsset> portfolioAssets = curPortfolio.getAsset();

            // 오늘일자 기준 (종목, 비중) 계산
            Map<String, Double> recentAssetWeights = getWeights(portfolioAssets);

            /**
             * 구매 당시 비중과 오늘날의 비중을 비교하여
             * 1. 포트폴리오의 lower bound 를 넘은 종목, upper bound를 넘은 종목을 찾는다
             * 2. +-10%p의 차이가 존재하는 자산을 찾는다
             *
             */
            // 종목 코드와 비중을 비교하기 위해 자산 리스트와 포트폴리오 정보를 매핑
            List<Integer> assetIds = portfolioAssets.stream()
                .map(PortfolioAsset::getAssetId)
                .toList();

            List<Asset> assets = assetRepository.findAllById(assetIds);

            List<String> assetCodes = assets
                .stream()
                .map(Asset::getCode)
                .toList();

            List<String> assetNames = assets
                .stream()
                .map(Asset::getName)
                .toList();

            // lowerBound, upperBound, weights와 최근 비중을 비교

            List<String[]> lowerBoundExceededAssets = new ArrayList<>();
            List<String[]> upperBoundExceededAssets = new ArrayList<>();
            List<String[]> increasedWeightAssets = new ArrayList<>();
            List<String[]> decreasedWeightAssets = new ArrayList<>();

            for (int i = 0; i < assetCodes.size(); i++) {
                String names = assetNames.get(i);
                String code = assetCodes.get(i);
                Double recentWeight = recentAssetWeights.get(code); // 최근 비중
                PortfolioAsset portfolioAsset = portfolioAssets.get(i);
                Double lowerBound = portfolioAsset.getLowerBound(); // 포트폴리오의 하한선
                Double upperBound = portfolioAsset.getUpperBound(); // 포트폴리오의 상한선
                Double originWeight = portfolioAsset.getFictionalWeight() * 100; // 포트폴리오의 기존 비중

                log.warn("names : {}",names);
                log.warn("code : {}",code);
                log.warn("recentWeight : {}",recentWeight);
                log.warn("originWeight : {}",originWeight);

                // 1. lower bound와 upper bound를 넘는 종목 찾기
                if (recentWeight < lowerBound) {
                    // log.warn(code+"의 비중이 lower bound를 넘었습니다.");
                    lowerBoundExceededAssets.add(new String[]{names,code});
                } else if (recentWeight > upperBound) {
                    // log.warn(code+"의 비중이 upper bound를 넘었습니다.");
                    upperBoundExceededAssets.add(new String[]{names,code});
                }

                if((recentWeight - originWeight) > 10.0){
                    // code 종목의 비중이 10% 상승한것
                    // log.info(code + "의 비중이 10% 상승하였습니다.");
                    increasedWeightAssets.add(new String[]{names,code});
                }
                else if((originWeight - recentWeight) > 10.0){
                    // code 종목의 비중이 -10% 감소한것
                    // log.info(code + "의 비중이 10% 감소하였습니다.");
                    decreasedWeightAssets.add(new String[]{names,code});
                }
            }
            // 알람 메일을 보내야할 종목에 대해 메일을 발송한다
            if (!lowerBoundExceededAssets.isEmpty() || !upperBoundExceededAssets.isEmpty() ||
                !increasedWeightAssets.isEmpty() || !decreasedWeightAssets.isEmpty()) {

                // 메일 발송 로직
                StringBuilder mailContent = new StringBuilder("포트폴리오 자산 비중 경고:\n");

                mailContent.append(MailTemplate.template);
                // 배열 데이터를 HTML로 변환
                String lowerBoundAssetsHtml = "";
                String upperBoundAssetsHtml = "";
                String increasedWeightAssetsHtml = "";
                String decreasedWeightAssetsHtml = "";

                // 하한선을 넘은 자산
                if (!lowerBoundExceededAssets.isEmpty()) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("<p>하한선을 넘은 자산:</p><ul>");
                    for (String[] asset : lowerBoundExceededAssets) {
                        sb.append("<li>").append(asset[0]).append("("+asset[1]+")").append("</li>");
                    }
                    sb.append("</ul>");
                    lowerBoundAssetsHtml = sb.toString();
                }

                // 상한선을 넘은 자산
                if (!upperBoundExceededAssets.isEmpty()) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("<p>상한선을 넘은 자산:</p><ul>");
                    for (String[] asset : upperBoundExceededAssets) {
                        sb.append("<li>").append(asset[0]).append("("+asset[1]+")").append("</li>");
                    }
                    sb.append("</ul>");
                    upperBoundAssetsHtml = sb.toString();
                }

                // 비중이 10% 상승한 자산
                if (!increasedWeightAssets.isEmpty()) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("<p>비중이 10% 상승한 자산:</p><ul>");
                    for (String[] asset : increasedWeightAssets) {
                        sb.append("<li>").append(asset[0]).append("("+asset[1]+")").append("</li>");
                    }
                    sb.append("</ul>");
                    increasedWeightAssetsHtml = sb.toString();
                }

                // 비중이 10% 감소한 자산
                if (!decreasedWeightAssets.isEmpty()) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("<p>비중이 10% 감소한 자산:</p><ul>");
                    for (String[] asset : decreasedWeightAssets) {
                        sb.append("<li>").append(asset[0]).append("("+asset[1]+")").append("</li>");
                    }
                    sb.append("</ul>");
                    decreasedWeightAssetsHtml = sb.toString();
                }

                // // 플레이스홀더를 실제 데이터로 대체
                String finalMailContent = mailContent.toString()
                    .replace("{{lowerBoundAssets}}", lowerBoundAssetsHtml)
                    .replace("{{upperBoundAssets}}", upperBoundAssetsHtml)
                    .replace("{{increasedWeightAssets}}", increasedWeightAssetsHtml)
                    .replace("{{decreasedWeightAssets}}", decreasedWeightAssetsHtml);
                //
                EmailMessage emailMessage = EmailMessage.builder()
                    .to(user.getEmail())
                    .subject("포트폴리오 자산 비중 경고")
                    .message(finalMailContent)
                    .build();
                //
                log.warn("emailMessage: {}", emailMessage);
                // 메일 발송 함수 호출
                emailService.sendMail(emailMessage);
            }

        }
        // return new ResponseWithMessage(HttpStatus.OK.value(),"메일발송에 성공하였습니다");
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<PortfolioValuationDto> getUserPortfolioPerformance(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId) {
        // 1. userId를 이용해서, mongoDB에서 데이터를 검색해 가져온다
        Portfolio portfolio = getMyPortfolioById(userId, portfolioId);

        // 1-1. 환율 가져오기
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        // 2. AssetList 구하기
        // asset_id 순으로 정렬되어 있음이 보장되어 있음
        List<PortfolioAsset> portfolioAssetList = portfolio.getAsset();

        List<Integer> assetIdList = portfolioAssetList.stream()
            .map(PortfolioAsset::getAssetId)
            .toList();

        List<Asset> assetList = assetRepository.findAllById(assetIdList);
        Asset sp500 = assetRepository.findById(SP500_ASSET_ID)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));
        List<Asset> benchMarkSP500 = List.of(sp500);

        List<Integer> purchaseQuantityList = portfolioAssetList.stream()
            .map(PortfolioAsset::getTotalPurchaseQuantity)
            .toList();

        // 3. 포트폴리오 백테스팅 결과 저장
        LocalDateTime recentDate = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);;

        List<Performance> performances = new ArrayList<>();
        List<Double> portfolioBacktestValuation = getPortfolioBacktestValuation(timeInterval, assetList, purchaseQuantityList, recentDate, recentExchangeRate);

        Integer[] purchaseNum = new Integer[30];
        Arrays.fill(purchaseNum, 1);
        List<Integer> purchaseNumOfSP500 = List.of(purchaseNum);
        List<Double> sp500BacktestValuation = getPortfolioBacktestValuation(timeInterval, benchMarkSP500, purchaseNumOfSP500, recentDate, recentExchangeRate);
        double ratio = portfolioBacktestValuation.get(0) / sp500BacktestValuation.get(0);

        for (int idx=0; idx<30; idx++) {
            performances.add(Performance.builder()
                .time(dateUtil.getPastDate(recentDate, timeInterval, 30 - idx))
                .valuation(portfolioBacktestValuation.get(idx))
                .sp500Valuation(sp500BacktestValuation.get(idx) * ratio)
                .build());
        }

        PortfolioValuationDto data = PortfolioValuationDto.builder()
            .portfolioId(portfolio.getId())
            .timeInterval(timeInterval)
            .measure(measure)
            .performances(performances)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(), "백테스팅 결과 조회 성공", data);
    }

    private List<Double> getPortfolioBacktestValuation(TimeInterval timeInterval, List<Asset> assetList, List<Integer> purchaseQuantityList, LocalDateTime recentDate, Double recentExchangeRate) {
        Double[] valuations = new Double[30];
        for (int idx = 0; idx < 30; idx ++) {
            valuations[idx] = (double) 0;
        }
        for (int idx = 0; idx < assetList.size(); idx++) {
            Asset asset = assetList.get(idx);
            Integer purchaseQuantity = purchaseQuantityList.get(idx);
            List<LocalDateTime> validDates = getCashedValidDatesOfAsset(asset, timeInterval, recentDate);

            List<Double> backTestValuationsOfAsset = getBackTestValuationOfAsset(asset, purchaseQuantity, validDates, recentExchangeRate);

            //            System.out.println("backTestValuationsOfAsset.size() = " + backTestValuationsOfAsset.size());
//           System.out.println("backTestValuationsOfAsset = " + backTestValuationsOfAsset);
            for (int subIdx=0; subIdx<30; subIdx++) {
                valuations[subIdx] += backTestValuationsOfAsset.get(subIdx);
            }
        }

        return List.of(valuations);
    }

    private List<Double> getBackTestValuationOfAsset(Asset asset, Integer purchaseQuantity, List<LocalDateTime> validDates, Double recentExchangeRate) {

        // 이 <날짜,가격> 의 맵
        List<AssetHistory> allHistoryOfAssets = assetHistoryRepository.findAllHistoryOfAssets(asset, validDates);
        HashMap<LocalDateTime, Double> valuationMap = new HashMap<>();

        for (AssetHistory assetHistory : allHistoryOfAssets) {
            valuationMap.put(assetHistory.getDate(), assetHistory.getPrice());
        }

        List<Double> backTestValuations = new ArrayList<>();
        for (int dDate = 30; dDate >= 1; dDate--) {
            int idx = validDates.size() - dDate;
            if (idx < 0) {
                backTestValuations.add(asset.getOldestPrice(recentExchangeRate) * purchaseQuantity);
            }
            else {
                Double price = valuationMap.get(validDates.get(idx));
                if (asset.getRegion().equals(Region.US)) price *= recentExchangeRate;
                backTestValuations.add(price * purchaseQuantity);
            }
        }

        return backTestValuations;
    }

    private List<LocalDateTime> getCashedValidDatesOfAsset(Asset asset, TimeInterval timeInterval, LocalDateTime recentDate) {
        List<LocalDateTime> cachedValidDates = redisHashRepository.getCachedValidDates(asset.getCode(), timeInterval.toString());
        if(ObjectUtils.isEmpty(cachedValidDates)){ // 캐싱된 결과가 없는 경우, 직접 찾아야 한다
            cachedValidDates = new ArrayList<>();
            for (int dDate = 30; dDate >= 1; dDate--) {

                LocalDateTime curDateTime = dateUtil.getPastDate(recentDate, timeInterval, dDate);
                List<LocalDateTime> validDate = assetHistoryService.getValidDate(asset, curDateTime, 1);
                if (!validDate.isEmpty()) cachedValidDates.add(validDate.get(0));

            }

            LocalDateTime now = LocalDateTime.now();
            LocalDateTime midNight = now.toLocalDate().atTime(LocalTime.MIDNIGHT).plusDays(1);

            Duration durationUntilMidnight = Duration.between(now,midNight);
            long ttlInSeconds = durationUntilMidnight.getSeconds();
            redisHashRepository.cacheValidDates(asset.getCode(), timeInterval.toString(),cachedValidDates,ttlInSeconds);
        }
        return cachedValidDates;
    }

    /**
     * 유저의 포트폴리오가 가진 섹터 비중을 반환하는 메서드
     *
     * @param userId
     * @param portfolioId
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<List<SectorInfo>> getUserPortfolioSector(Integer userId, String portfolioId) {

        // 유저를 가져온다
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.USER_NOT_FOUND));

        // 유저가 가진 포트폴리오를 가져온다
        Portfolio myPortfolio = getMyPortfolioById(userId, portfolioId);

        if(ObjectUtils.isEmpty(myPortfolio)){
            // 유저가 가진 포트폴리오가 없는 경우, 에러
            throw new MutualRiskException(ErrorCode.PORTFOLIO_NOT_FOUND);
        }

        // 유저가 가진 포트폴리오 자산의 ID를 구한다
        List<Integer> assetIds = myPortfolio.getAsset().stream()
            .map(PortfolioAsset::getAssetId).toList();

        // 유저가 가진 포트폴리오 자산을 가지고온다
        List<Asset> assets = assetRepository.findAllById(assetIds);

        // (섹터,오늘날의 비중) 을 구해야한다
        // 오늘 비중 : 구매한 자산의 quantity * 최근 가격
        Map<Sector, Double> sectorToTotalValue = new HashMap<>();
        Double totalValueOfHolding = 0.0;

        // 환율을 가져오는 메서드
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        for (Asset asset : assets) {
            Sector sector = asset.getIndustry().getSector(); // 섹터를 가져옴
            // log.warn("SECTOR : {}", sector.getName());
            double totalValue = 0.0;

            // 포트폴리오에서 해당 자산을 찾고, 수량 * 최근 가격을 계산
            for (PortfolioAsset pAsset : myPortfolio.getAsset()) {
                if (pAsset.getAssetId().equals(asset.getId())) {
                    if(asset.getRegion().equals(Region.US)){
                        totalValue += pAsset.getTotalPurchaseQuantity() * asset.getRecentPrice() * recentExchangeRate; // 수량 * 최근 가격 * 환율
                    }
                    else{
                        totalValue += pAsset.getTotalPurchaseQuantity() * asset.getRecentPrice();
                    }
                }
            }

            // 이미 섹터가 존재하면 값을 더하고, 없으면 새로운 값을 추가
            sectorToTotalValue.put(sector, sectorToTotalValue.getOrDefault(sector, 0.0) + totalValue);
            // log.warn("totalValue : {}",totalValue);

            totalValueOfHolding+=totalValue;
        }

        // (섹터,누적합) 구했으니, 다시 순회하면서 누적합을 totalValueOfHolding으로 나눈 맵을 구한다
        List<SectorInfo> sectorInfos = new ArrayList<>();
        for(Entry<Sector,Double> entry:sectorToTotalValue.entrySet()){
            Sector sector = entry.getKey();
            Double weight = 0.0;
            try{
                weight = entry.getValue() * 100.0/totalValueOfHolding;
            }
            catch(ArithmeticException e){
                weight = 0.0;
            }
            SectorInfo sectorInfo = SectorInfo.of(sector,weight);
            sectorInfos.add(sectorInfo);
        }

        // 결과를 반환한다
        return new ResponseWithData<>(HttpStatus.OK.value(),"섹터 조회에 성공하였습니다",sectorInfos);
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<FrontierDto> getFrontierPoints(Integer userId, String portfolioId) {
        // 1. 유저가 가진 포트폴리오를 가져온다
        Portfolio myPortfolio = getMyPortfolioById(userId, portfolioId);

        List<FrontierPoint> frontierPoints = myPortfolio.getFrontierPoints();
        PortfolioPerformance fictionalPerformance = myPortfolio.getFictionalPerformance();

        FrontierDto frontierDto = FrontierDto.builder()
            .frontierPoints(frontierPoints)
            .optimalPerformance(fictionalPerformance)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(), "효율적 포트폴리오 곡선 데이터 정상 반환", frontierDto);
    }

    /**
     * 유저의 포트폴리오 자산 평가액 변동을 조회해서 반환하는 메서드
     * @param timeInterval : 한 틱당 시간 간격
     * @param measure : 포트폴리오 performance를 측정하는 measure (default: valuation)
     * @param userId : 유저 id
     * @param portfolioId : 포트폴리오 id
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<PortfolioValuationDto> getHistoricalValuation(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId) {
        // 1. userId를 이용해서, mongoDB에서 데이터를 검색해 가져온다
        Portfolio portfolio = getMyPortfolioById(userId, portfolioId);

        // 2. 유저의 포트폴리오 리스트 받아오기
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(userId);

        // 3. 현재 조회 중인 포트폴리오를, myPortfolioList에서 찾는다
        int idx = 0;
        while (!myPortfolioList.get(idx).getId().equals(portfolioId)) {
            idx++;
        }

        // 4. 계산을 시작할 날짜 구하기
        // 4-1. 현재 조회 중인 포트폴리오가, 가장 최신일 경우 : endDate를 현재 시간으로 설정
        // 4-2. 현재 조회 중인 포트폴리오가, 과거 포트폴리오일 경우 : endDate를 그 포트폴리오가 교체된 시간으로 설정
        LocalDateTime endDate = myPortfolioList.get(idx).getIsActive().equals(Boolean.TRUE)?
            LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0):
            myPortfolioList.get(idx).getDeletedAt();

        // 5. 각 날짜에 대해, 포트폴리오의 valuation을 구하기
        List<Performance> performances = new ArrayList<>();
        Portfolio curPortfolio;
        for (int dDate = 1; dDate <= 30; dDate++) {

            // 구하기를 원하는 날짜
            LocalDateTime targetDate = dateUtil.getPastDate(endDate, timeInterval, dDate);

            // targetDate 기준으로, 유저의 포트폴리오가 어떤 거였는지를 찾는다
            while (idx < myPortfolioList.size() && myPortfolioList.get(idx).getCreatedAt().isAfter(targetDate)) {
                idx++;
            }

            // targetDate에 유저의 포트폴리오가 존재하지 않았을 경우 : break
            if (idx == myPortfolioList.size()) break;

            curPortfolio = myPortfolioList.get(idx);

            List<PortfolioAsset> portfolioAssetList = curPortfolio.getAsset();

            List<Integer> assetIdList = portfolioAssetList.stream()
                .map(PortfolioAsset::getAssetId)
                .toList();

            List<Asset> assetList = assetRepository.findAllById(assetIdList);

            Double valuation = getHistoricValuation(portfolioAssetList, assetList, targetDate);
            performances.add(Performance.builder()
                .time(targetDate)
                .valuation(valuation)
                .build());
        }

        Collections.reverse(performances);

        PortfolioValuationDto data = PortfolioValuationDto.builder()
            .portfolioId(portfolio.getId())
            .timeInterval(timeInterval)
            .measure(measure)
            .performances(performances)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(), "자산 평가액 조회 성공", data);

    }

    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<List<PortfolioReturnDto>> getHistoricalReturns(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId) {
        // 1. userId를 이용해서, mongoDB에서 데이터를 검색해 가져온다
        Portfolio portfolio = getMyPortfolioById(userId, portfolioId);

        // 2. 유저의 포트폴리오 리스트 받아오기
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(userId);

        // 3. 현재 조회 중인 포트폴리오를, myPortfolioList에서 찾는다
        int idx = 0;
        while (!myPortfolioList.get(idx).getId().equals(portfolioId)) {
            idx++;
        }

        // 4. 계산을 시작할 날짜 구하기
        // 4-1. 현재 조회 중인 포트폴리오가, 가장 최신일 경우 : endDate를 현재 시간으로 설정
        // 4-2. 현재 조회 중인 포트폴리오가, 과거 포트폴리오일 경우 : endDate를 그 포트폴리오가 교체된 시간으로 설정
        LocalDateTime endDate = myPortfolioList.get(idx).getIsActive().equals(Boolean.TRUE)?
            LocalDateTime.now().withDayOfMonth(1):
            myPortfolioList.get(idx).getDeletedAt().withDayOfMonth(1);

        List<PortfolioReturnDto> portfolioReturnList = new ArrayList<>();
        // 30달 전, 29달 전, ..., 1달 전의 데이터를 기준으로 수익률을 구한다
        Portfolio curPortfolio;
        for (int dDate = 1; dDate <= 30; dDate++) {
            // 구하기를 원하는 날짜
            LocalDateTime targetDate = dateUtil.getPastDate(endDate, timeInterval, dDate);

            // targetDate 기준으로, 유저의 포트폴리오가 어떤 거였는지를 찾는다
            while (idx < myPortfolioList.size() && myPortfolioList.get(idx).getCreatedAt().isAfter(targetDate)) {
                idx++;
            }

            // targetDate에 유저의 포트폴리오가 존재하지 않았을 경우 : break
            if (idx == myPortfolioList.size()) break;

            curPortfolio = myPortfolioList.get(idx);

            // 2. AssetList 구하기
            List<PortfolioAsset> portfolioAssetList = curPortfolio.getAsset();

            List<Integer> assetIdList = portfolioAssetList.stream()
                .map(PortfolioAsset::getAssetId)
                .toList();

            List<Asset> assetList = assetRepository.findAllById(assetIdList);

            Double returns = getPortfolioReturn(portfolioAssetList, assetList, targetDate, timeInterval);   // 데이터 기준일을 기준으로, return 구하기
            portfolioReturnList.add(PortfolioReturnDto.builder()
                .date(targetDate)
                .portfolioReturns(returns)
                .build());
        }

        Collections.reverse(portfolioReturnList);
        return new ResponseWithData<>(HttpStatus.OK.value(), "포트폴리오 월별 수익률 조회 성공", portfolioReturnList);
    }

    /**
     * 유저가 선택한 버전의 포트폴리오에 대항 현황요약 정보를 반환한다
     * @param userId
     * @param version
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<PortfolioStatusSummary> userPortfolioSummary(Integer userId, Integer version) {
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        // 유저를 조회한다
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.USER_NOT_FOUND));

        // 해당 버전의 포트폴리오를 조회한다
        Portfolio userPortfolio = portfolioRepository.getPortfolioByIdAndVersion(userId, version)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.PORTFOLIO_NOT_FOUND));

        // 1. 이 포트폴리오의 현재 기준 valuation을 계산한다
        List<PortfolioAsset> portfolioAssetList = userPortfolio.getAsset();
        List<Integer> assetIds = portfolioAssetList.stream().map(PortfolioAsset::getAssetId).toList();
        List<Asset> findAssets = assetRepository.findAllById(assetIds);

        // 자산 ID로 매칭하여 자산 정보 찾기
        Map<Integer, Asset> assetMap = findAssets.stream()
            .collect(Collectors.toMap(Asset::getId, asset -> asset));

        Double curValuation = 0.0;
        for (PortfolioAsset pAsset : portfolioAssetList) {
            Asset asset = assetMap.get(pAsset.getAssetId());
            if (!ObjectUtils.isEmpty(asset)) {
                curValuation += asset.getRecentPrice(recentExchangeRate) * pAsset.getTotalPurchaseQuantity();
            }
        }

        // 2. 이 포트폴리오의 마지막 날짜 기준 valuation
        Double lastValuation = 0.0;
        if (userPortfolio.getIsActive()) {
            lastValuation = null;
        } else {
            LocalDateTime targetDate = userPortfolio.getDeletedAt();
            lastValuation = calculateValuation(portfolioAssetList, findAssets, targetDate, recentExchangeRate);
        }

        // 3. 생성일 기준 valuation
        LocalDateTime targetDate = userPortfolio.getCreatedAt();
        Double initValuation = calculateValuation(portfolioAssetList, findAssets, targetDate, recentExchangeRate);

        // 4. 위험률 대비 수익률 : sharpe_ratio
        // userId에 해당하는 포트폴리오가 존재할 경우
        List<Asset> assetList = getAssetsFromPortfolio(portfolioAssetList);
        // 자산들의 구매 금액을 저장하는 리스트
        List<Double> assetValuationList = getAssetValuationList(portfolioAssetList, assetList);
        // 포트폴리오에 속해 있는 자산 리스트

        double totalValuation = assetValuationList.stream()
            .mapToDouble(Double::doubleValue)
            .sum();

        // 3. 각 값의 비율을 계산해서 weights 리스트에 추가
        List<Double> weights = calculateWeights(assetValuationList, totalValuation);

        // 4. buildPortfolioResponse 객체 만들기
        // 4-1. 현재 포트폴리오의 퍼포먼스 구하기
        PortfolioPerformance portfolioPerformance = getPortfolioPerformance(assetList, weights, totalValuation);
        Double sharpeRatio = portfolioPerformance.sharpeRatio();

            // 전체 시장을 가지고와서, 각 시장에 Map을 이용해서 구분해보자
        List<Asset> allAssets = assetRepository.findAll();
        Map<String, List<Asset>> assetsByCategory = new HashMap<>();

        List<Asset> assetsInKrx = new ArrayList<>();
        List<Asset> assetsInKrxETF = new ArrayList<>();
        List<Asset> assetsInNasdaq = new ArrayList<>();
        List<Asset> assetsInNasdaqETF = new ArrayList<>();

        for (Asset asset : allAssets) {
            if (asset.getRegion() == Region.KR && asset.getMarket() != Market.ETF) {
                assetsInKrx.add(asset);
            } else if (asset.getRegion() == Region.KR && asset.getMarket() == Market.ETF) {
                assetsInKrxETF.add(asset);
            } else if (asset.getRegion() == Region.US && asset.getIndustry().getId() != 1) {
                assetsInNasdaq.add(asset);
            } else if (asset.getRegion() == Region.US && asset.getIndustry().getId() == 1) {
                assetsInNasdaqETF.add(asset);
            }
        }

        // 카테고리별로 자산을 Map에 추가
        assetsByCategory.put("assetsInKrx", assetsInKrx);
        assetsByCategory.put("assetsInKrxETF", assetsInKrxETF);
        assetsByCategory.put("assetsInNasdaq", assetsInNasdaq);
        assetsByCategory.put("assetsInNasdaqETF", assetsInNasdaqETF);

        // 각 카테고리별로 RiskRatio 계산
        RiskRatio krxRatio = null;
        RiskRatio krxETFRatio = null;
        RiskRatio nasdaqRatio = null;
        RiskRatio nasdaqETFRatio = null;

        for (Entry<String, List<Asset>> entry : assetsByCategory.entrySet()) {
            String category = entry.getKey();
            List<Asset> assets = entry.getValue();

//            System.out.println("category = " + category);
//            System.out.println("assets = " + assets);

            RiskRatio riskRatio = calculateSharpeRatioRanking(assets, sharpeRatio);

            // 각 카테고리에 맞게 RiskRatio 할당
            switch (category) {
                case "assetsInKrx":
                    krxRatio = riskRatio;
                    break;
                case "assetsInKrxETF":
                    krxETFRatio = riskRatio;
                    break;
                case "assetsInNasdaq":
                    nasdaqRatio = riskRatio;
                    break;
                case "assetsInNasdaqETF":
                    nasdaqETFRatio = riskRatio;
                    break;
            }
        }

        // 지금까지 모든것을 DTO에 담아 반환한다
        PortfolioStatusSummary summary = PortfolioStatusSummary.builder()
            .created_at(userPortfolio.getCreatedAt())
            .curValuation(curValuation)
            .lastValuation(lastValuation)
            .initValuation(initValuation)
            .sharpeRatio(sharpeRatio)
            .krxSharpeRatio(krxRatio)
            .krxETFSharpeRatio(krxETFRatio)
            .nasdaqSharpeRatio(nasdaqRatio)
            .nasdaqETFSharpeRatio(nasdaqETFRatio)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(),"포트폴리오 현황 조회에 성공하였습니다",summary);
    }


    /**
     * 유저의 포트폴리오 제작 요청을 받아서 포트폴리오의 퍼포먼스,비중을 반환하는 메서드
     *
     * @param userId
     * @param initInfo
     * @return
     */
    @Override
    @Transactional
    public ResponseWithData<CalculatedPortfolio> initPortfolio(Integer userId, PortfolioInitDto initInfo) {
        // 1-1. 유저가 입력한 dto를 받아서, api에 던질 dto 형식으로 고친다
        // PortfolioInitDto -> PortfolioRequestDto로 변환
        // 유저가 입력한 자산의 expected_return을 가지고 와야한다
        // 입력받은 순서 그대로 리스트안에 넣기 위해 정렬해야함
        List<Asset> findAssets = assetRepository.findAllById(initInfo.assetIds())
            .stream()
            .sorted(Comparator.comparing(asset -> initInfo.assetIds().indexOf(asset.getId())))
            .collect(Collectors.toList());

        PortfolioRequestDto portfolioRequestDto = getPortfolioRequestDto(findAssets, initInfo);

        log.info("initPortfolio 실행");
        log.info("portfolioRequestDto : {}", portfolioRequestDto);
        EfficientFrontierResponseDto efficientFrontierResponseDto;
        try {
            efficientFrontierResponseDto = mutualRiskClient.post("https://j11a607.p.ssafy.io/fastapi/v1/portfolio", portfolioRequestDto)
                .bodyToMono(EfficientFrontierResponseDto.class)
                .block();
        } catch (Exception e) {
            log.warn("fastAPI 호출시 에러 발생 : {}", e.getMessage());
            throw new MutualRiskException(ErrorCode.EFFICIENT_PORTFOLIO_API_ERROR);
        }

        // 4. 반환할 데이터 만들기
        // 4-1. 새롭게 추천해주는 포트폴리오에 대한 정보
        PortfolioAnalysis original = getPortfolioAnalysis(initInfo, efficientFrontierResponseDto, portfolioRequestDto, findAssets);

        // 4-2. 기존 포트폴리오가 있다면, oldPortfolioAssetInfoList 구하기
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(userId);
        List<RecommendAssetInfo> oldPortfolioAssetInfoList = null;
        if (!myPortfolioList.isEmpty()) {
            Portfolio latestPortfolio = myPortfolioList.get(0);
            oldPortfolioAssetInfoList = getRecommendAssetInfoFrom(latestPortfolio);
        }

        // 4-3. newPortfolioAssetInfoList 구하기
        List<RecommendAssetInfo> newPortfolioAssetInfoList = original.assets();

        // 4-4. 자산별 보유 비중 변화량 구하기
        List<ChangeAssetInfo> changeAssetInfoList;
        // 4-4-1. 기존 포트폴리오가 있는 경우
        if (oldPortfolioAssetInfoList != null) {
            changeAssetInfoList = getChangeassetInfoList(oldPortfolioAssetInfoList, newPortfolioAssetInfoList);
        }
        else {
            changeAssetInfoList = getChangeassetInfoList(newPortfolioAssetInfoList);
        }


        CalculatedPortfolio calculatedPortfolio = CalculatedPortfolio.builder()
            .original(original)
            .oldPortfolioAssetInfoList(oldPortfolioAssetInfoList)
            .newPortfolioAssetInfoList(newPortfolioAssetInfoList)
            .changeAssetInfoList(changeAssetInfoList)
            .build();

        // 6. 프론트에 던진다
        return new ResponseWithData<>(HttpStatus.OK.value(), "포트폴리오 제작 미리보기 입니다", calculatedPortfolio);
    }

    private double calculateCovariance(List<Double> list1, List<Double> list2) {
        // 두 리스트 중 더 작은 길이를 찾음
        int minLength = Math.min(list1.size(), list2.size());

        // 평균 계산
        double mean1 = 0.0;
        double mean2 = 0.0;
        for (int i = 0; i < minLength; i++) {
            mean1 += list1.get(i);
            mean2 += list2.get(i);
        }
        mean1 /= minLength;
        mean2 /= minLength;

        // 공분산 계산
        double covariance = 0.0;
        for (int i = 0; i < minLength; i++) {
            covariance += (list1.get(i) - mean1) * (list2.get(i) - mean2);
        }
        covariance /= minLength; // n으로 나누어 공분산 값 계산

        return covariance;
    }

    private List<Double> getDailyPriceChangeRateHistory(List<Asset> assetList, Map<String, Double> weights) {
//        // 각 자산의 예상 수익
//        List<Double> expectedReturns = findAssets.stream()
//            .map(Asset::getExpectedReturn)
//            .toList();

        Double[] realWeights = new Double[assetList.size()];
        for (int i = 0; i < assetList.size(); i++) {
            realWeights[i] = weights.get(String.valueOf(i));
        }

        // 가져올 자산의 기간을 설정한다
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusYears(1);

        // 기간 내의 가격 기록을 가지고온다
        List<AssetHistory> historyOfAssets = assetHistoryRepository.findRecentHistoryOfAssetsBetweenDates(
            assetList, startDate, endDate);

        // historyOfAssets를 순회하면서, (자산,[가격리스트])의 맵을 만든다
        Map<Asset, List<Double>> dailyPriceChangeRateMap = new HashMap<>();
        for (AssetHistory assetHistory : historyOfAssets) {
            Asset asset = assetHistory.getAsset();

            if (!dailyPriceChangeRateMap.containsKey(asset)) {
                dailyPriceChangeRateMap.put(asset, new ArrayList<>());
            } else { // 각 자산별로 가격 변화율의 리스트를 생성
                dailyPriceChangeRateMap.get(asset).add(assetHistory.getDailyPriceChangeRate());
            }
        }

        // 각 자산별 리스트를 돌면서, 가장 길이가 짧은 가격 리스트를 반환한다
        int minLen = Integer.MAX_VALUE;
        for (Entry<Asset, List<Double>> entry : dailyPriceChangeRateMap.entrySet()) {
            List<Double> priceList = entry.getValue();

            minLen = Math.min(minLen, priceList.size());
        }

        // 각 자산별로 minLen길이만큼 잘라서 리스트에 넣는다
        List<List<Double>> dailyPriceChangeRateList = new ArrayList<>();
        for (Entry<Asset, List<Double>> entry : dailyPriceChangeRateMap.entrySet()) {
            List<Double> priceList = entry.getValue();

            dailyPriceChangeRateList.add(priceList.subList(0, minLen));
        }

        int numDays = dailyPriceChangeRateList.get(0).size(); // 모든 리스트의 길이가 같다고 가정
        List<Double> weightedAverages = new ArrayList<>(); // 가중평균을 저장할 리스트

        // 각 날짜별로 가중평균 계산
        for (int day = 0; day < numDays; day++) {
            double weightedSum = 0.0;

            // 각 자산에 대해 가중치를 적용하여 해당 날짜의 값을 합산
            for (int asset = 0; asset < realWeights.length; asset++) {
                double priceChange = dailyPriceChangeRateList.get(asset).get(day);
                double weight = realWeights[asset];
                weightedSum += priceChange * weight;
            }

            // 가중평균 계산
            weightedAverages.add(weightedSum);
        }

        return weightedAverages;
    }

    /**
     * 과거 포트폴리오가 없는 경우, 현재 포트폴리오를 바탕으로 종목별 보유 수량 변화량을 계산한다
     */
    private List<ChangeAssetInfo> getChangeassetInfoList(List<RecommendAssetInfo> newPortfolioAssetInfoList) {
        // 반환할 종목별 보유량 변화 리스트
        List<ChangeAssetInfo> changeAssetInfoList = new ArrayList<>();

        for (RecommendAssetInfo recommendAssetInfo : newPortfolioAssetInfoList) {

            ChangeAssetInfo changeAssetInfo = ChangeAssetInfo.of(recommendAssetInfo,0, recommendAssetInfo.purchaseNum());
            changeAssetInfoList.add(changeAssetInfo);
        }

        return changeAssetInfoList;
    }

    /**
     * 과거 투자 자산 목록과 현재 투자 자산 목록을 비교해서, 새로 사거나 팔아야 하는 양을 반환한다
     */
    private List<ChangeAssetInfo> getChangeassetInfoList(List<RecommendAssetInfo> oldPortfolioAssetInfoList, List<RecommendAssetInfo> newPortfolioAssetInfoList) {

        // 반환할 종목별 보유량 변화 리스트
        List<ChangeAssetInfo> changeAssetInfoList = new ArrayList<>();

        // asset_id를 key로, 자산별 정보를 value로 하는 map(이전 포트폴리오 기준)
        HashMap<Integer, RecommendAssetInfo> oldAssetInfoMap = new HashMap<>();
        for (RecommendAssetInfo oldAssetInfo : oldPortfolioAssetInfoList) {
            oldAssetInfoMap.put(oldAssetInfo.assetId(), oldAssetInfo);
        }

        // asset_id를 key로, 자산별 정보를 value로 하는 map(새로운 포트폴리오 기준)
        HashMap<Integer, RecommendAssetInfo> newAssetInfoMap = new HashMap<>();
        for (RecommendAssetInfo newAssetInfo : newPortfolioAssetInfoList) {
            newAssetInfoMap.put(newAssetInfo.assetId(), newAssetInfo);
        }

        // 방문 여부 체크용 hashSet
        HashSet<Integer> visited = new HashSet<>();

        // oldPortfolioAssetInfoList에 있는 자산부터, 변화량을 확인
        for (RecommendAssetInfo oldAssetInfo: oldPortfolioAssetInfoList) {
            visited.add(oldAssetInfo.assetId());

            // 새롭게 제작한 포트폴리오에 해당 자산이 없는 경우, newPurchaseNum = 0이다
            // 있는 경우에만, 새로운 포트폴리오에서 가져온다
            int newPurchaseNum = 0;
            if (newAssetInfoMap.containsKey(oldAssetInfo.assetId())) {
                newPurchaseNum = newAssetInfoMap.get(oldAssetInfo.assetId()).purchaseNum();
            }

            ChangeAssetInfo changeAssetInfo = ChangeAssetInfo.of(oldAssetInfo, oldAssetInfo.purchaseNum(), newPurchaseNum);

            changeAssetInfoList.add(changeAssetInfo);
        }

        // newPortfolioAssetInfoList에 있는 자산도 마저 확인
        for (RecommendAssetInfo newAssetInfo: newPortfolioAssetInfoList) {

            // 이미 체크한 적이 없는 자산일 경우에만, 새롭게 추가
            if (!visited.contains(newAssetInfo.assetId())) {

                // 기존 포트폴리오에 자산이 없는 경우, oldPurchaseNum = 0이다
                // 있는 경우에만, 기존 보유량을 가져온다
                int oldPurchaseNum = 0;
                if (oldAssetInfoMap.containsKey(newAssetInfo.assetId())) {
                    oldPurchaseNum = oldAssetInfoMap.get(newAssetInfo.assetId()).purchaseNum();
                }

                ChangeAssetInfo changeAssetInfo = ChangeAssetInfo.of(newAssetInfo, oldPurchaseNum,
                    newAssetInfo.purchaseNum());

                changeAssetInfoList.add(changeAssetInfo);


            }
        }

        return changeAssetInfoList;
    }


    /**
     * 포트폴리오 document 에 있는 자산 투자 정보를 가공하여, 자산 + 투자 비중 정보를 반환
     */
    private List<RecommendAssetInfo> getRecommendAssetInfoFrom(Portfolio portfolio) {
        List<PortfolioAsset> portfolioAssetList = portfolio.getAsset();
        List<Integer> assetIdList = portfolioAssetList.stream()
            .map(PortfolioAsset::getAssetId)
            .toList();
        List<Asset> assetList = assetRepository.findAllById(assetIdList);
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        // 1. 투자 비중 정보 구하기
        List<Double> purchasePrices = IntStream.range(0, portfolioAssetList.size())
            .mapToDouble(i -> portfolioAssetList.get(i).getTotalPurchaseQuantity() * assetList.get(i).getRecentPrice(recentExchangeRate))
            .boxed()
            .toList();

        // 합계 계산
        double sum = purchasePrices.stream().mapToDouble(Double::doubleValue).sum();

        // 정규화: 각 요소를 합계로 나누기
        List<Double> weights = purchasePrices.stream()
            .map(price -> price / sum)
            .toList();

        // 2. purchaseNum 리스트 구하기
        List<Integer> purchaseNumList = portfolioAssetList.stream()
            .map(PortfolioAsset::getTotalPurchaseQuantity)
            .toList();

        // 3. RecommendAssetInfo 리스트 반환
        return IntStream.range(0, assetList.size())
            .mapToObj(i -> RecommendAssetInfo.of(assetList.get(i), weights.get(i), purchaseNumList.get(i), recentExchangeRate))
            .toList();
    }

    /**
     * 유저의 포트폴리오 제작시 요청 정보(initInfo)를 받아서, hadoop api에 날릴 requeset를 만드는 함수
     */
    private HadoopRecommendAssetRequestDto getHadoopRequestBody(List<Integer> assetIds, List<Double> lowerBounds, List<Double> upperBounds, List<Double> exactProportions, int minCovarianceSectorId) {
        // hadoop에 보낼 JSON 요청 본문을 만든다
        Map<String, Object> recommendBody = new HashMap<>();

        // 새로운 자산 id들을 가지고온다
        List<Asset> assetsNotInList = assetRepository.findAssetsNotInList(assetIds, minCovarianceSectorId);

        // sharpeRatio가 높은 순으로, 최대 500개의 자산만 후보군에 넣음
        List<Asset> newAssetCandidates = assetsNotInList.stream()
            .filter(asset -> asset.getSharpeRatio() != null)
            .sorted(Comparator.comparingDouble(Asset::getSharpeRatio).reversed())
            .limit(500)
            .toList();

        List<Integer> newAssetIds = newAssetCandidates.stream().map(Asset::getId).toList();

        return HadoopRecommendAssetRequestDto.builder()
            .existingAssets(assetIds)
            .newAssets(newAssetIds)
            .lowerBounds(lowerBounds)
            .upperBounds(upperBounds)
            .exactProportion(exactProportions)
            .build();
    }

    private PortfolioAnalysis getPortfolioAnalysis(PortfolioInitDto initInfo, EfficientFrontierResponseDto responseBody, PortfolioRequestDto portfolioRequestDto, List<Asset> findAssets) {
        // 퍼포먼스를 가지고 온다
        PortfolioPerformance fictionalPerformance = responseBody.fictionalPerformance();

        // 각 자산의 가중치를 가지고온다
        List<Double> fictionalWeights = responseBody.weights();
        double totalCash = initInfo.totalCash();

        // 환율을 가지고온다
        Double exchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        List<Integer> purchaseNumList = new ArrayList<>();

        int idx = 0;
        for (Double fictionalWeight: fictionalWeights) {

            // 자산 비중을 가지고 온다
            Asset asset = findAssets.get(idx);

            // 구매량을 결정해야한다
            // 구매량은, (전체 현금 보유량 * 자산 비중 / 해당 자산의 가격) 을 반올림 한 값으로 한다
            int purchaseNum = (int)Math.round(totalCash * fictionalWeight / asset.getRecentPrice(exchangeRate));

            purchaseNumList.add(purchaseNum);
            idx++;
        }

        List<Double> priceList = findAssets
            .stream()
            .map(asset -> asset.getRecentPrice(exchangeRate))
            .toList();

        List<Double> realWeights = calculateWeights(priceList, purchaseNumList);

        List<AssetWeightDto> assetWeightDtoList = new ArrayList<>(IntStream.range(0, findAssets.size())
            .mapToObj(i -> AssetWeightDto.of(findAssets.get(i), realWeights.get(i)))
            .toList());

        // log.warn("assetWeightDtoList: {}", assetWeightDtoList);

        // assetWeightDtoList를 정렬
        assetWeightDtoList.sort(Comparator.comparingInt(aw -> aw.asset().getId()));

        PortfolioPerformance portfolioPerformance = getPortfolioPerformance(assetWeightDtoList);


        List<RecommendAssetInfo> recommendAssetInfos = IntStream.range(0, findAssets.size())
            .mapToObj(i -> RecommendAssetInfo.of(findAssets.get(i), realWeights.get(i), purchaseNumList.get(i), exchangeRate))
            .toList();

        // 기존 포트폴리오로 측정한 퍼포먼스와 추천자산 비중을 반환한다

        return PortfolioAnalysis.of(initInfo, fictionalPerformance, portfolioPerformance, recommendAssetInfos);
    }

    // asset + weights의 리스트를 받아서, 포트폴리오의 expected_return과 volatility를 계산
    private PortfolioPerformance getPortfolioPerformance(List<AssetWeightDto> assetWeightDtoList) {

        // 기대 수익률 구하기
        double expected_return = assetWeightDtoList.stream()
            .mapToDouble(assetWeightDto -> assetWeightDto.weight() * assetWeightDto.asset().getExpectedReturn())
            .sum();

        List<Asset> assetList = assetWeightDtoList.stream()
            .map(AssetWeightDto::asset)
            .toList();

        List<Double> weights = assetWeightDtoList.stream()
            .map(AssetWeightDto::weight)
            .toList();
        List<AssetCovariance> assetCovarianceList = assetCovarianceRepository.findAllCovarianceIn(assetList);

        Double volatility = calculatePortfolioVariance(weights, assetCovarianceList, assetList);

        return PortfolioPerformance.builder()
            .expectedReturn(expected_return)
            .volatility(volatility)
            .sharpeRatio(expected_return / volatility)
            .build();
    }

    private Double calculatePortfolioVariance(List<Double> weights, List<AssetCovariance> assetCovarianceList, List<Asset> assetList) {
        int numAssets = weights.size();

        // 공분산 행렬 초기화
        double[][] covarianceMatrix = new double[numAssets][numAssets];

        // 공분산 행렬 채우기
        for (AssetCovariance assetCov : assetCovarianceList) {
            int index1 = assetList.indexOf(assetCov.getAsset1());
            int index2 = assetList.indexOf(assetCov.getAsset2());

            // 자산 1과 자산 2 사이의 공분산 값을 행렬에 설정
            covarianceMatrix[index1][index2] = assetCov.getCovariance();
            covarianceMatrix[index2][index1] = assetCov.getCovariance(); // 공분산 행렬은 대칭
        }

        // W^T * Σ * W 계산
        double portfolioVariance = 0.0;

        // W^T * Σ * W 수행 (행렬 곱)
        for (int i = 0; i < numAssets; i++) {
            for (int j = 0; j < numAssets; j++) {
                portfolioVariance += weights.get(i) * covarianceMatrix[i][j] * weights.get(j);
            }
        }

        return Math.sqrt(portfolioVariance);
    }

    private List<Double> calculateWeights(List<Double> priceList, List<Integer> purchaseNumList) {
        // 각 자산의 총 가치 계산 (가격 * 수량)
        List<Double> totalAssetValues = new ArrayList<>();
        for (int i = 0; i < priceList.size(); i++) {
            double totalValue = priceList.get(i) * purchaseNumList.get(i);
            totalAssetValues.add(totalValue);
        }

        // 전체 포트폴리오의 총 가치 계산
        double totalPortfolioValue = totalAssetValues.stream().mapToDouble(Double::doubleValue).sum();

        // 각 자산의 weight 계산 (자산의 총 가치 / 전체 포트폴리오의 총 가치)
        List<Double> weights = new ArrayList<>();
        for (double assetValue : totalAssetValues) {
            double weight = assetValue / totalPortfolioValue;
            weights.add(weight);
        }

        return weights;
    }

    /**
     * 유저의 포트폴리오 제작 요청을 받아서, 해당 포트폴리오를 mongoDB에 업데이트한다
     * 기존 포트폴리오를 만료 처리하는 로직도 포함되어 있음
     */
    @Override
    @Transactional
    public ResponseWithData<String> confirmPortfolio(Integer userId, PortfolioInitDto initInfo) {
        // 1. 포트폴리오 생성 정보 받아오기
        // todo: 얘내 리팩토링해야 함. 포트폴리오 생성 api 에도 똑같은 로직이 있음

        // 1-1. 유저가 입력한 dto를 받아서, api에 던질 dto 형식으로 고친다
        // PortfolioInitDto -> PortfolioRequestDto로 변환
        // 유저가 입력한 자산의 expected_return을 가지고 와야한다
        // 입력받은 순서 그대로 리스트안에 넣기 위해 정렬해야함
        List<Asset> findAssets = assetRepository.findAllById(initInfo.assetIds())
            .stream()
            .sorted(Comparator.comparing(asset -> initInfo.assetIds().indexOf(asset.getId())))
            .collect(Collectors.toList());

        PortfolioRequestDto portfolioRequestDto = getPortfolioRequestDto(findAssets, initInfo);

        EfficientFrontierResponseDto efficientFrontierResponseDto = mutualRiskClient.post("https://j11a607.p.ssafy.io/fastapi/v1/portfolio", portfolioRequestDto)
            .bodyToMono(EfficientFrontierResponseDto.class)
            .block();

        // 2. 유저의 가장 최신 포트폴리오 받아오기
        // 2-1. 유저의 포트폴리오 리스트 받아오기
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(userId);

        // 2-2-1. 유저의 과거 포트폴리오가 없을 경우
        Portfolio portfolio;
        if (myPortfolioList.isEmpty()) {
            portfolio = getInitialPortfolioFrom(efficientFrontierResponseDto, initInfo, userId, 1, findAssets);
        }
        // 2-2-2. 유저의 과거 포트폴리오가 있는 경우
        else {
            // 2-2-2-1. 유저의 가장 최신 포트폴리오 구하기
            Portfolio recentPortfolio = myPortfolioList.get(0);

            // 2-2-2-2. 최신 포트폴리오 만료 처리
            recentPortfolio.setDeletedAt(LocalDateTime.now());
            recentPortfolio.setIsActive(Boolean.FALSE);

            // 2-2-2-3. 만료 처리한 포트폴리오 저장
            portfolioRepository.savePortfolio(recentPortfolio);

            portfolio = getNewPortfolioFrom(efficientFrontierResponseDto, initInfo, userId, recentPortfolio.getVersion()+1, findAssets, recentPortfolio);
        }

        log.warn("뉴 포트폴리오는 잘 되나요");
        log.warn("portfolio: {}", portfolio);

        List<RecommendAsset> recommendAssets = new ArrayList<>();

        ObjectMapper objectMapper = new ObjectMapper();
        // Redis에서 JSON 문자열을 가져옴
        ArrayList<LinkedHashMap<String, Object>> json = (ArrayList<LinkedHashMap<String, Object>>) redisHashRepository.getHashData("recommend", String.valueOf(userId));
//        System.out.println("json = " + json);

        try {
            // JSON 배열을 List<RecommendAssetResponseResultDto>로 변환
            for (LinkedHashMap<String, Object> j: json) {
                RecommendAssetResponseResultDto recommendAssetResponseResultDto = objectMapper.convertValue(j, RecommendAssetResponseResultDto.class);
                recommendAssets.add(RecommendAsset.from(recommendAssetResponseResultDto));
            }
        } catch (Exception e) {
            System.out.println("e.getMessage() = " + e.getMessage());
            System.out.println("e = " + e);
            throw new MutualRiskException(ErrorCode.REDIS_PARSE_ERROR);
        }

        portfolio.setRecommendAssets(recommendAssets);

        // 4. 저장한다
        portfolioRepository.savePortfolio(portfolio);

        // 5. 프론트에 결과를 반환한다
        return new ResponseWithData<>(HttpStatus.OK.value(), "포트폴리오 확정 성공!!", "포트폴리오 확정 성공!!");
    }

    /**
     * 유저가 포트폴리오 제작하기 버튼을 눌렀을 때, 제작한 포트폴리오의 백테스팅 데이터를 반환하는 메서드
     * 유저의 과거 포트폴리오가 존재할 경우, 가장 최근 포트폴리오의 백테스팅 데이터도 구해 함께 반환
     */
    @Override
    public ResponseWithData<PortfolioBackTestDto> getBackTestOfCreatedPortfolio(Integer userId, List<RecommendAssetInfo> recommendAssetInfoList, TimeInterval timeInterval, PerformanceMeasure measure) {

        // 1. 환율 가져오기
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();
        LocalDateTime recentDate = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);;

        // 2. 현재 추천해 준 포트폴리오의 자산을 바탕으로, 백테스팅 데이터 구하기
        // 2-1. assetId 순으로 정렬
        recommendAssetInfoList.sort(Comparator.comparingInt(RecommendAssetInfo::assetId));

        // 2-2. AssetList 구하기
        List<Integer> assetIdList = recommendAssetInfoList.stream()
            .map(RecommendAssetInfo::assetId)
            .toList();

        // 참고로, findAllById를 하면 id가 정렬된 순서로 나온다
        List<Asset> assetList = assetRepository.findAllById(assetIdList);

        // 2-3. 유저가 각 자산에 대해 산 수량 정보(purchaseQuantityList)를 구하기
        List<Integer> purchaseQuantityList = recommendAssetInfoList.stream()
            .map(RecommendAssetInfo::purchaseNum)
            .toList();

        // 2-4. 포트폴리오 백테스팅 결과 저장
        List<Performance> performances = new ArrayList<>();
        List<Double> portfolioBacktestValuation = getPortfolioBacktestValuation(timeInterval, assetList, purchaseQuantityList, recentDate, recentExchangeRate);

        for (int idx=0; idx<30; idx++) {
            performances.add(Performance.builder()
                .time(dateUtil.getPastDate(recentDate, timeInterval, 30 - idx))
                .valuation(portfolioBacktestValuation.get(idx))
                .build());
        }

        PortfolioValuationDto portfolioValuation = PortfolioValuationDto.builder()
            .timeInterval(timeInterval)
            .measure(measure)
            .performances(performances)
            .build();

        // 3. benchMark 계산
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(userId);
        List<Double> portfolioBenchMarkValuation;
        Boolean hasBeforePortfolio;
        // 3-1. 유저의 과거 포트폴리오가 존재할 경우 - 유저의 최신 포트폴리오가 benchMark가 된다
        if (!myPortfolioList.isEmpty()) {
            hasBeforePortfolio = Boolean.TRUE;

            // 3-1-1. 기본 변수 업데이트
            Portfolio latestPortfolio = myPortfolioList.get(0);
            List<PortfolioAsset> portfolioAssetList = latestPortfolio.getAsset();

            assetIdList = portfolioAssetList.stream()
                .map(PortfolioAsset::getAssetId)
                .toList();

            // assetList 구하기
            assetList = assetRepository.findAllById(assetIdList);

            // 유저가 각 자산에 대해 산 수량 리스트(purchaseQuantityList)를 구하기
            purchaseQuantityList = portfolioAssetList.stream()
                .map(PortfolioAsset::getTotalPurchaseQuantity)
                .toList();

            // 3-1-2. 포트폴리오 백테스팅 결과 저장
            // 포트폴리오의 성과 지표를 저장하는 list
            portfolioBenchMarkValuation = getPortfolioBacktestValuation(timeInterval, assetList, purchaseQuantityList, recentDate, recentExchangeRate);
        }
        // 3-2. 유저의 포트폴리오가 없을 경우 -> S&P 500이 benchMark가 된다
        else {
            hasBeforePortfolio = Boolean.FALSE;

            // 3-2-1. s&p500 지수의 성과 지표 얻기
            // 1주를 들고 있었을 때 기준임
            Asset sp500 = assetRepository.findById(SP500_ASSET_ID)
                .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));
            List<Asset> benchMarkSP500 = List.of(sp500);
            Integer[] purchaseNum = new Integer[30];
            Arrays.fill(purchaseNum, 1);
            List<Integer> purchaseNumOfSP500 = List.of(purchaseNum);
            portfolioBenchMarkValuation = getPortfolioBacktestValuation(timeInterval, benchMarkSP500, purchaseNumOfSP500, recentDate, recentExchangeRate);
        }

        // 4. 둘의 시작을 맞춰 준다
        double ratio = portfolioBacktestValuation.get(0) / portfolioBenchMarkValuation.get(0);

        // 4-1. BenchMark에 사용될 performance 구하기
        // 위에서 구한 ratio를 이용함
        performances = new ArrayList<>();
        for (int idx=0; idx<30; idx++) {
            performances.add(Performance.builder()
                .time(dateUtil.getPastDate(recentDate, timeInterval, 30 - idx))
                .valuation(portfolioBenchMarkValuation.get(idx) * ratio)
                .build());
        }

        PortfolioValuationDto benchMark = PortfolioValuationDto.builder()
            .timeInterval(timeInterval)
            .measure(measure)
            .performances(performances)
            .build();

        // benchMark와 portfolioValuation를 담아서 반환
        PortfolioBackTestDto portfolioBackTestDto = PortfolioBackTestDto.builder()
            .hasBeforePortfolio(hasBeforePortfolio)
            .benchMark(benchMark)
            .portfolioValuation(portfolioValuation)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(), "백테스팅 결과 조회 성공", portfolioBackTestDto);
    }

    /**
     * 유저에게 받은 정보를 바탕으로 추천 종목을 계산하여 반환하는 메서드
     *
     * @param userId
     * @param recommendAssetRequestDto
     * @return
     */
    @Override
    public ResponseWithData<List<RecommendAssetResponseResultDto>> getRecommendedAssets(Integer userId, RecommendAssetRequestDto recommendAssetRequestDto) {

        // 0. 계산에 필요한 변수 초기화
        Double totalCash = recommendAssetRequestDto.totalCash();
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        //1. 자산들의 ids를 가지고온다
        // id 순으로 정렬
        List<Integer> assetIds = recommendAssetRequestDto.newPortfolioAssetInfoList().stream()
            .map(RecommendAssetInfo::assetId)
            .sorted()
            .toList();

        // 2. 자산을 가지고온다
        // 기본적으로 id 순으로 정렬
        List<Asset> assetList = assetRepository.findAllById(assetIds);

		// 3. id순으로 정렬된 각 자산의 weight를 얻는다
		List<Double> weight = recommendAssetRequestDto.newPortfolioAssetInfoList().stream()
            .sorted(Comparator.comparingInt(RecommendAssetInfo::assetId))
			.map(RecommendAssetInfo::weight)
			.toList();

        // 4. sector 중, 현재 포트폴리오와 가장 공분산이 적은 섹터를 구한다
        // 섹터의 대표 포트폴리오로 iShares U.S 섹터별 ETF를 활용
		int minCovarianceSectorId = -1;
		Double minCovariance = Double.MAX_VALUE;
		for (int idx = 0; idx < SECTOR_BENCHMARK_LIST.length; idx++) {
			BenchMark benchMark = SECTOR_BENCHMARK_LIST[idx];

			double covariance = calculateCovariance(assetList, weight, benchMark.getAssetId());
            if (covariance < minCovariance) {
                minCovariance = covariance;
                minCovarianceSectorId = benchMark.getSectorId();
            }
        }

        // 5. Hadoop API 호출
        // 5-1. Hadoop API RequestBody 제작
        HadoopRecommendAssetRequestDto requestBody = getHadoopRequestBody(assetIds,recommendAssetRequestDto.lowerBounds(),recommendAssetRequestDto.upperBounds(), recommendAssetRequestDto.exactProportion(), minCovarianceSectorId);
        System.out.println("requestBody = " + requestBody);
        // 5-2. Hadoop API를 날리고 요청 받아오기
        HadoopRecommendAssetResultDto responseBody;
        try {
            responseBody = mutualRiskClient.post("http://j11a607a.p.ssafy.io:8000/optimize", requestBody)
                .bodyToMono(HadoopRecommendAssetResultDto.class)
                .block();
        } catch (Exception e) {
            log.warn("hadoop 종목 추천 api 호출시 에러 발생 - 에러 메시지: {}", e.getMessage());
            throw new MutualRiskException(ErrorCode.HADOOP_RECOMMEND_ASSET_API_ERROR);
        }

        System.out.println("responseBody = " + responseBody);

        // 6. 받은 응답을 가지고 유저가 실제로 투자했을 때의 성과 지표 계산
        List<RecommendAssetResponseResultDto> realResponse = new ArrayList<>(); // 현재 api가 반환할 data

        for (HadoopRecommendAssetInfo hadoopRecommendAssetInfo: responseBody.top5Assets()) {
            Integer newAssetId = hadoopRecommendAssetInfo.newAssetId();

            Asset newAsset = assetRepository.findById(newAssetId)
                .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

            ArrayList<Asset> copiedAssetList = new ArrayList<>(assetList);
            copiedAssetList.add(newAsset);

            List<Double> weights = hadoopRecommendAssetInfo.weights();

            // 유저가 가지고 있는 돈(totalCash)을 고려하여, 실제 투자했을 때 몇 주씩 투자하게 될지를 계산
            // 계산 방식 : 반올림
            List<Integer> purchaseNumList = IntStream.range(0, weights.size())
                .map(i -> Math.toIntExact(Math.round(totalCash * weights.get(i) / copiedAssetList.get(i).getRecentPrice(recentExchangeRate))))
                .boxed()
                .toList();

            List<Double> priceList = copiedAssetList.stream()
                .map(asset -> asset.getRecentPrice(recentExchangeRate))
                .toList();

            // 실제 투자 비중을 계산
            List<Double> realWeights = calculateWeights(priceList, purchaseNumList);

            // 성과 지표 계산 : expectedReturn, volatility, sharpeRatio
            Double expectedReturn = IntStream.range(0, realWeights.size())
                .mapToDouble(i -> copiedAssetList.get(i).getExpectedReturn() * realWeights.get(i))
                .sum();

            List<AssetCovariance> assetCovarianceList = assetCovarianceRepository.findAllCovarianceIn(copiedAssetList);
            Double volatility = calculatePortfolioVariance(realWeights, assetCovarianceList, copiedAssetList);

            Double sharpeRatio = expectedReturn / volatility;

            realResponse.add(RecommendAssetResponseResultDto.of(newAsset, expectedReturn, volatility, sharpeRatio));
        }

        // sharpeRatio가 큰 순으로 정렬
        realResponse.sort(Comparator.comparingDouble(RecommendAssetResponseResultDto::sharpeRatio).reversed());
        // redis에 저장
        redisHashRepository.saveHashData("recommend", String.valueOf(userId), realResponse, 60);

        return new ResponseWithData<>(HttpStatus.OK.value(), "하둡 api 추천 결과 정상 반환", realResponse);
    }

    /**
     * 리밸런싱 포트폴리오 제작을 수행하는 api
     */
    @Override
    @Transactional
    public ResponseWithData<CalculatedPortfolio> initPortfolioRebalance(Integer userId, RebalancePortfolioInitDto initInfo) {
//        // 1-1. 새롭게 추천해주는 포트폴리오에 대한 정보
//        PortfolioAnalysis original = getPortfolioAnalysis(initInfo, responseBody, portfolioRequestDto);

        // 1. 유저의 과거 포트폴리오를 가져와, 가장 최신 포트폴리오 데이터를 가져온다
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(userId);
        if (myPortfolioList.isEmpty()) throw new MutualRiskException(ErrorCode.PORTFOLIO_NOT_FOUND);
        Portfolio latestPortfolio = myPortfolioList.get(0); // 가장 최신 포트폴리오 데이터

        // 2. PortfolioInitDto 형식으로 고치기
        // 2-1. totalCash(현재 포트폴리오의 valuation) 구하기
        Double totalCash = getCurrentValuation(latestPortfolio) + initInfo.extraCash();

        // 2-2. 포트폴리오의 asset 구하기
        // asset은 assetId 순으로 정렬되어 있음이 보장
        List<PortfolioAsset> portfolioAssetList = latestPortfolio.getAsset();

        // 2-3. assetIds 구하기
        List<Integer> assetIds = new ArrayList<>(portfolioAssetList
            .stream()
            .map(PortfolioAsset::getAssetId)
            .sorted()
            .toList());

        // 2-4. 제약 조건 구하기
        List<Double> lowerBound = new ArrayList<>(portfolioAssetList.stream()
            .map(PortfolioAsset::getLowerBound)
            .toList());
        List<Double> upperBound = new ArrayList<>(portfolioAssetList.stream()
            .map(PortfolioAsset::getUpperBound)
            .toList());
        List<Double> exactProportion = new ArrayList<>(portfolioAssetList.stream()
            .map(PortfolioAsset::getExactProportion)
            .toList());

        // 2-5. extraAssetId가 있다면 assetIds와 제약 조건 변경
        Integer extraAssetId = initInfo.extraAssetId();
        if (extraAssetId != null) {
            assetIds.add(extraAssetId);
            lowerBound.add((double) 0);
            upperBound.add((double) 1);
            exactProportion.add(null);
        }

        PortfolioInitDto portfolioInitDto = PortfolioInitDto.builder()
            .totalCash(totalCash)
            .name(initInfo.name())
            .assetIds(assetIds)
            .lowerBounds(lowerBound)
            .upperBounds(upperBound)
            .exactProportion(exactProportion)
            .build();


        return initPortfolio(userId, portfolioInitDto);
    }

    @Override
    public ResponseWithMessage updateUserPortfolio(Integer userId) {

        // 1. 유저의 최신 포트폴리오 가져오기
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(userId);
        if (myPortfolioList.isEmpty()) {throw new MutualRiskException(ErrorCode.PORTFOLIO_NOT_FOUND);}

        Portfolio recentPortfolio = myPortfolioList.get(0);

        // 2. 하둡 api를 호출하기 위한 인자들 구성하기
        // 포트폴리오를 구성하는 자산
        // id 순으로 정렬됨이 보장되어 있음
        List<PortfolioAsset> portfolioAssetList = recentPortfolio.getAsset();
        List<Integer> assetIds = portfolioAssetList.stream()
            .map(PortfolioAsset::getAssetId)
            .toList();

        List<Double> lowerBounds = portfolioAssetList.stream()
            .map(PortfolioAsset::getLowerBound)
            .toList();

        List<Double> upperBounds = portfolioAssetList.stream()
            .map(PortfolioAsset::getUpperBound)
            .toList();

        List<Double> extractProportion = portfolioAssetList.stream()
            .map(PortfolioAsset::getExactProportion)
            .toList();


        // 2. 자산을 가지고온다
        // 기본적으로 id 순으로 정렬
        List<Asset> assetList = assetRepository.findAllById(assetIds);

        // 3. id순으로 정렬된 각 자산의 weight를 얻는다
        Map<String, Double> portfolioWeights = getWeights(portfolioAssetList);
        List<Double> weight = portfolioAssetList.stream()
            .map(portfolioAsset -> portfolioWeights.get(portfolioAsset.getCode()))
            .toList();

        // 4. sector 중, 현재 포트폴리오와 가장 공분산이 적은 섹터를 구한다
        // 섹터의 대표 포트폴리오로 iShares U.S 섹터별 ETF를 활용
        int minCovarianceSectorId = -1;
        Double minCovariance = Double.MAX_VALUE;
        for (int idx = 0; idx < SECTOR_BENCHMARK_LIST.length; idx++) {
            BenchMark benchMark = SECTOR_BENCHMARK_LIST[idx];

            double covariance = calculateCovariance(assetList, weight, benchMark.getAssetId());
            if (covariance < minCovariance) {
                minCovariance = covariance;
                minCovarianceSectorId = benchMark.getSectorId();
            }
        }


        // 5. Hadoop API 호출
        // 5-1. Hadoop API RequestBody 제작
        HadoopRecommendAssetRequestDto requestBody = getHadoopRequestBody(assetIds, lowerBounds, upperBounds, extractProportion, minCovarianceSectorId);
        System.out.println("requestBody = " + requestBody);
        // 5-2. Hadoop API를 날리고 요청 받아오기
        HadoopRecommendAssetResultDto responseBody;
        try {
            responseBody = mutualRiskClient.post("http://j11a607a.p.ssafy.io:8000/optimize", requestBody)
                .bodyToMono(HadoopRecommendAssetResultDto.class)
                .block();
        } catch (Exception e) {
            log.warn("hadoop 종목 추천 api 호출시 에러 발생 - 에러 메시지: {}", e.getMessage());
            throw new MutualRiskException(ErrorCode.HADOOP_RECOMMEND_ASSET_API_ERROR);
        }

        System.out.println("responseBody = " + responseBody);

        // 6. 받은 응답을 가지고 유저가 실제로 투자했을 때의 성과 지표 계산

        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        // 6-1. totalCash 계산
        double totalCash = IntStream.range(0, assetList.size())
            .mapToDouble(i -> assetList.get(i).getRecentPrice(recentExchangeRate) * portfolioAssetList.get(i).getTotalPurchaseQuantity())
            .sum();

        List<RecommendAssetResponseResultDto> realResponse = new ArrayList<>(); // 현재 api가 반환할 data

        for (HadoopRecommendAssetInfo hadoopRecommendAssetInfo: responseBody.top5Assets()) {
            Integer newAssetId = hadoopRecommendAssetInfo.newAssetId();

            Asset newAsset = assetRepository.findById(newAssetId)
                .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

            ArrayList<Asset> copiedAssetList = new ArrayList<>(assetList);
            copiedAssetList.add(newAsset);

            List<Double> weights = hadoopRecommendAssetInfo.weights();

            // 유저가 가지고 있는 돈(totalCash)을 고려하여, 실제 투자했을 때 몇 주씩 투자하게 될지를 계산
            // 계산 방식 : 반올림
            List<Integer> purchaseNumList = IntStream.range(0, weights.size())
                .map(i -> Math.toIntExact(Math.round(totalCash * weights.get(i) / copiedAssetList.get(i).getRecentPrice(recentExchangeRate))))
                .boxed()
                .toList();

            List<Double> priceList = copiedAssetList.stream()
                .map(asset -> asset.getRecentPrice(recentExchangeRate))
                .toList();

            // 실제 투자 비중을 계산
            List<Double> realWeights = calculateWeights(priceList, purchaseNumList);

            // 성과 지표 계산 : expectedReturn, volatility, sharpeRatio
            Double expectedReturn = IntStream.range(0, realWeights.size())
                .mapToDouble(i -> copiedAssetList.get(i).getExpectedReturn() * realWeights.get(i))
                .sum();

            List<AssetCovariance> assetCovarianceList = assetCovarianceRepository.findAllCovarianceIn(copiedAssetList);
            Double volatility = calculatePortfolioVariance(realWeights, assetCovarianceList, copiedAssetList);

            Double sharpeRatio = expectedReturn / volatility;

            realResponse.add(RecommendAssetResponseResultDto.of(newAsset, expectedReturn, volatility, sharpeRatio));
        }

        // sharpeRatio가 큰 순으로 정렬
        realResponse.sort(Comparator.comparingDouble(RecommendAssetResponseResultDto::sharpeRatio).reversed());
        List<RecommendAsset> recommendAssets = realResponse.stream()
            .map(RecommendAsset::from)
            .toList();


        recentPortfolio.setRecommendAssets(recommendAssets);
        portfolioRepository.savePortfolio(recentPortfolio);

        return new ResponseWithMessage(HttpStatus.OK.value(), "성공~~~!!!!");
    }

    /**
     * 포트폴리오의 현재 기준 평가액을 반환하는 함수
     */
    private Double getCurrentValuation(Portfolio portfolio) {
        double valuation = 0;
        List<PortfolioAsset> portfolioAssets = portfolio.getAsset();
        List<Integer> assetIds = portfolioAssets.stream()
            .map(PortfolioAsset::getAssetId)
            .toList();
        List<Asset> assets = assetRepository.findAllById(assetIds);
        Double exchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        return IntStream.range(0, portfolioAssets.size())
            .mapToDouble(i -> portfolioAssets.get(i).getTotalPurchaseQuantity() * assets.get(i).getRecentPrice(exchangeRate))
            .sum();
    }

    // assetList에 weights의 비중으로 투자한 포트폴리오와, assetId에 해당하는 자산 사이의 수익률의 공분산을 계산한다
    // 이미 저장되어 있는 asset_covariance table 활용
    private double calculateCovariance(List<Asset> assetList, List<Double> weights, Integer assetId) {
        List<AssetCovariance> assetCovarianceList = assetCovarianceRepository.findAllCovarianceByAssetsAndAssetId(assetList, assetId);

        return IntStream.range(0, assetList.size())
            .mapToDouble(i -> assetCovarianceList.get(i).getCovariance() * weights.get(i))
            .sum();
    }

    // fastapi에서 준 결과를 가지고, 새로운 포트폴리오를 만든다
    // 기존 유저의 포트폴리오가 있는 경우를 가정하고 만듬
    private Portfolio getNewPortfolioFrom(EfficientFrontierResponseDto responseBody, PortfolioInitDto initInfo, Integer userId, int version, List<Asset> findAssets, Portfolio recentPortfolio) {

        List<PortfolioAsset> recentPortfolioAssetList = recentPortfolio.getAsset();

        // 기존의 포트폴리오를 저장하는 map
        // asset_id: key, PortfolioAsset : value
        Map<Integer, PortfolioAsset> recentPortfolioAssetMap = new HashMap<>();
        for (PortfolioAsset asset : recentPortfolioAssetList) {
            recentPortfolioAssetMap.put(asset.getAssetId(), asset);
        }

        // fictionalPerformance 부분을 매핑하여 PortfolioPerformance 객체로 변환
        PortfolioPerformance fictionalPerformance = responseBody.fictionalPerformance();

        List<Double> fictionalWeights = responseBody.weights();

        // frontierPoints 부분을 매핑하여 List<FrontierPoint>로 변환
        List<FrontierPoint> frontierPoints = responseBody.frontierPoints();

        Double totalCash = initInfo.totalCash();
        List<PortfolioAsset> portfolioAssetList = new ArrayList<>();

        int idx = 0;
        for (Double fictionalWeight : fictionalWeights) {
            // 자산 비중을 가지고 온다
            Asset asset = findAssets.get(idx);
            Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

            // 구매량을 결정해야한다
            // 구매량은, (전체 현금 보유량 * 자산 비중 / 해당 자산의 가격) 을 반올림 한 값으로 한다
            int purchaseNum = (int) Math.round(totalCash * fictionalWeight / asset.getRecentPrice(recentExchangeRate));

            int recentPurchaseNum;
            double recentPurchasePrice;
            if (recentPortfolioAssetMap.containsKey(asset.getId())) {
                PortfolioAsset portfolioAsset = recentPortfolioAssetMap.get(asset.getId());
                recentPurchaseNum = portfolioAsset.getTotalPurchaseQuantity();
                recentPurchasePrice = portfolioAsset.getTotalPurchasePrice();
            }
            else {
                recentPurchaseNum = 0;
                recentPurchasePrice = 0;
            }

            double purchasePrice = recentPurchasePrice + (purchaseNum - recentPurchaseNum) * asset.getRecentPrice(recentExchangeRate);

            portfolioAssetList.add(PortfolioAsset.builder()
                .assetId(asset.getId())
                .code(asset.getCode())
                .totalPurchaseQuantity(purchaseNum)
                .totalPurchasePrice(purchasePrice)
                .lowerBound(initInfo.lowerBounds().get(idx))
                .upperBound(initInfo.upperBounds().get(idx))
                .exactProportion(initInfo.exactProportion().get(idx))
                .fictionalWeight(fictionalWeight)
                .build());

            idx++;
        }


        return Portfolio.builder()
            .type("portfolio")
            .name(initInfo.name())
            .userId(userId)
            .version(version)
            .isActive(Boolean.TRUE)
            .createdAt(LocalDateTime.now())
            .asset(portfolioAssetList)
            .fictionalPerformance(fictionalPerformance)
            .frontierPoints(frontierPoints)
            .build();
    }

    // fastapi에서 준 결과를 가지고, 새로운 포트폴리오를 만든다
    // 기존 유저의 포트폴리오가 없는 경우를 가정하고 만듬
    private Portfolio getInitialPortfolioFrom(EfficientFrontierResponseDto efficientFrontierResponseDto, PortfolioInitDto initInfo, Integer userId, int version, List<Asset> findAssets) {
        PortfolioPerformance fictionalPerformance = efficientFrontierResponseDto.fictionalPerformance();

        List<Double> fictionalWeights = efficientFrontierResponseDto.weights();

        List<FrontierPoint> frontierPoints = efficientFrontierResponseDto.frontierPoints();

        Double totalCash = initInfo.totalCash();
        List<PortfolioAsset> portfolioAssetList = new ArrayList<>();

        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        int idx = 0;
        for (Double fictionalWeight : fictionalWeights) {
            // 자산 비중을 가지고 온다
            Asset asset = findAssets.get(idx);

            // 구매량을 결정해야한다
            // 구매량은, (전체 현금 보유량 * 자산 비중 / 해당 자산의 가격) 을 반올림 한 값으로 한다
            int purchaseNum = (int) Math.round(totalCash * fictionalWeight / asset.getRecentPrice(recentExchangeRate));

            portfolioAssetList.add(PortfolioAsset.builder()
                .assetId(asset.getId())
                .code(asset.getCode())
                .totalPurchaseQuantity(purchaseNum)
                .totalPurchasePrice(purchaseNum * asset.getRecentPrice(recentExchangeRate))
                .lowerBound(initInfo.lowerBounds().get(idx))
                .upperBound(initInfo.upperBounds().get(idx))
                .exactProportion(initInfo.exactProportion().get(idx))
                .fictionalWeight(fictionalWeight)
                .build());

            idx++;
        }


        return Portfolio.builder()
            .type("portfolio")
            .name(initInfo.name())
            .userId(userId)
            .version(version)
            .isActive(Boolean.TRUE)
            .createdAt(LocalDateTime.now())
            .asset(portfolioAssetList)
            .fictionalPerformance(fictionalPerformance)
            .frontierPoints(frontierPoints)
            .build();
    }

    /**
     * 유저가 입력한 포트폴리오 구성 데이터를 바탕으로, fastAPI에 던질 request를 만든다
     */
    private PortfolioRequestDto getPortfolioRequestDto(List<Asset> findAssets, PortfolioInitDto initInfo) {
        // 각 자산의 예상 수익
        List<Double> expectedReturns = findAssets.stream()
            .map(Asset::getExpectedReturn)
            .toList();

        HashMap<Integer, Integer> assetIdToIdx = new HashMap<>();
        for (int idx=0; idx<findAssets.size(); idx++) {
            assetIdToIdx.put(findAssets.get(idx).getId(), idx);
        }

        List<AssetCovariance> allCovariance = assetCovarianceRepository.findAllCovarianceIn(findAssets);
        Double[][] covMatrix = new Double[findAssets.size()][findAssets.size()];

        for (AssetCovariance assetCovariance : allCovariance) {
            Integer assetId1 = assetCovariance.getAsset1().getId();
            Integer assetId2 = assetCovariance.getAsset2().getId();

            int idx1 = assetIdToIdx.get(assetId1);
            int idx2 = assetIdToIdx.get(assetId2);
            covMatrix[idx1][idx2] = assetCovariance.getCovariance();
        }

        return PortfolioRequestDto.builder()
            .expectedReturns(expectedReturns)
            .covMatrix(covMatrix)
            .lowerBounds(initInfo.lowerBounds())
            .upperBounds(initInfo.upperBounds())
            .exactProportion(initInfo.exactProportion())
            .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<PortfolioTotalSearchDto> getAllUserPortfolio(Integer userId) {
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(userId);
        List<SimplePortfolioDto> simplePortfolioDtoList = myPortfolioList.stream()
            .map(SimplePortfolioDto::from)
            .toList();

        // 1. 유저의 포트폴리오가 존재하지 않을 경우
        if (simplePortfolioDtoList.isEmpty()) {
            PortfolioTotalSearchDto portfolioTotalSearchDto = PortfolioTotalSearchDto.builder()
                .hasPortfolio(Boolean.FALSE)
                .portfolioList(simplePortfolioDtoList)
                .build();

            return new ResponseWithData<>(HttpStatus.OK.value(), "유저 전체 포트폴리오 조회 성공", portfolioTotalSearchDto);
        }
        // 2. 유저의 포트폴리오가 존재할 경우
        else {
            // 유저의 가장 최신 포트폴리오의, 평가 금액 구하기
            Portfolio recentPortfolio = myPortfolioList.get(0);

            Double recentValuation = getRecentValuationOfPortfolio(recentPortfolio);

            PortfolioTotalSearchDto portfolioTotalSearchDto = PortfolioTotalSearchDto.builder()
                .hasPortfolio(Boolean.TRUE)
                .recentValuation(recentValuation)
                .portfolioList(simplePortfolioDtoList)
                .build();

            return new ResponseWithData<>(HttpStatus.OK.value(), "유저 전체 포트폴리오 조회 성공", portfolioTotalSearchDto);
        }
    }

    /**
     * 포트폴리오의, 현재 가격 기준 자산 평가액을 반환하는 함수
     */
    private Double getRecentValuationOfPortfolio(Portfolio recentPortfolio) {

        List<PortfolioAsset> portfolioAssetList = recentPortfolio.getAsset();
        List<Integer> assetIdList = portfolioAssetList.stream()
            .map(PortfolioAsset::getAssetId)
            .toList();
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();
        List<Asset> assetList = assetRepository.findAllById(assetIdList);

        // 각 asset에 대해, totalPurchaseQuantity * recentPrice를 해서 더해 준다(이게 평가액임)
        return IntStream.range(0, portfolioAssetList.size())
            .mapToDouble(i -> portfolioAssetList.get(i).getTotalPurchaseQuantity() * assetList.get(i).getRecentPrice(recentExchangeRate))
            .sum();
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseWithData<List<PortfolioAssetInfo>> getAssetInfoList(Integer userId, String portfolioId) {
        // 1. userId를 이용해서, mongoDB에서 데이터를 검색해 가져온다
        Portfolio portfolio = getMyPortfolioById(userId, portfolioId);

        List<PortfolioAssetInfo> portfolioAssetInfoList = getPortfolioAssetInfos(portfolio);

        return new ResponseWithData<>(HttpStatus.OK.value(), "포트폴리오 종목 정보 정상 반환", portfolioAssetInfoList);

    }

    private Double calculateValuation(List<PortfolioAsset> portfolioAssets, List<Asset> findAssets, LocalDateTime targetDate, Double recentExchangeRate) {
        Double valuation = 0.0;

        // 특정 날짜의 자산 가격을 가져옴
        List<AssetHistory> assetHistoryList = assetHistoryService.getAssetHistoryList(findAssets, targetDate);

        // 포트폴리오 자산과 AssetHistory를 매칭하여 계산
        for (PortfolioAsset portfolioAsset : portfolioAssets) {
            // AssetHistory에서 Asset을 찾아서 처리
            AssetHistory assetHistory = assetHistoryList.stream()
                .filter(ah -> ah.getAsset().getId().equals(portfolioAsset.getAssetId()))
                .findFirst()
                .orElse(null);

            if (assetHistory != null) {
                Asset asset = assetRepository.findById(portfolioAsset.getAssetId())
                    .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

                Double price = assetHistory.getPrice() ;
                if (asset.getRegion().equals(Region.US)) price *= recentExchangeRate;
                log.warn("price: {}", price);
                valuation += price * portfolioAsset.getTotalPurchaseQuantity();
            }
        }

        return valuation;
    }

    private List<PortfolioAssetInfo> getPortfolioAssetInfos(Portfolio portfolio) {
        // 1. 현재 유저 포트폴리오에 있는 자산 목록을 가져 온다
        List<PortfolioAsset> portfolioAssetList = portfolio.getAsset();
        List<Asset> assetList = getAssetsFromPortfolio(portfolioAssetList);

        // 2. asset -> assetInfo로 변경한다
        List<AssetInfo> assetInfoList = getAssetInfosFrom(assetList);

        // 3. valuation, weights 구하기
        // 3-1. valuation 구하기
        List<Double> valuationList = getAssetValuationList(portfolioAssetList, assetList);
        double totalValuation = valuationList.stream().mapToDouble(Double::doubleValue).sum();

        // 3-2. 각 자산의 평가액을 총합으로 나눠서 weights 리스트를 생성
        List<Double> weights = valuationList.stream()
            .map(valuation -> valuation / totalValuation)
            .toList();

        // 3-3. assetInfoList, valuationList, weights를 이용하여 portfolioAssetInfoList 생성
        List<PortfolioAssetInfo> portfolioAssetInfoList = IntStream.range(0, assetInfoList.size())
            .mapToObj(i -> PortfolioAssetInfo.of(portfolioAssetList.get(i), assetInfoList.get(i), weights.get(i), valuationList.get(i)))
            .toList();
        return portfolioAssetInfoList;
    }

    /**
     * List<Asset> -> List<AssetInfo> 로 바꾸는 함수
     */
    private List<AssetInfo> getAssetInfosFrom(List<Asset> assetList) {
        // 1. 자산들 중, 첫번째 자산의 최근종가일 2개를 가지고온다
        List<LocalDateTime> twoValidDate = assetHistoryService.getValidDate(assetList.get(0),
            LocalDateTime.now(), 2);

        // 2. 환율을 가져온다
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        // 3. 관심자산의 최근 종가를 가지고 온다
        List<AssetHistory> recentHistory = assetHistoryRepository.findRecentHistoryOfAssetsBetweenDates(
            assetList, twoValidDate.get(1), twoValidDate.get(0));

        // 4. AssetHistory를 Asset별로 그룹핑한다
        Map<Asset, List<AssetHistory>> assetHistoryMap = recentHistory.stream()
            .collect(Collectors.groupingBy(AssetHistory::getAsset));

        // log.warn("그룹핑 완료 : {}",assetHistoryMap);

        // 5. Asset을 각각의 AssetHistory와 매핑하여 AssetInfo 생성
        List<AssetInfo> assetInfoList = assetList.stream()
            .map(asset -> {
                // Asset에 대응하는 최근 2개의 AssetHistory를 가져온다
                return assetService.getAssetInfo(assetHistoryMap, recentExchangeRate, asset);
            })
            .toList();
        return assetInfoList;
    }

    /**
     * 자산의 위험률을 포트폴리오의 위험률과 비교하여, 현 포트폴리오의 위험률의 수준을 반환하는 메서드
     * @param assets
     * @param sharpeRatio
     * @return
     */
    private RiskRatio calculateSharpeRatioRanking(List<Asset> assets, Double sharpeRatio) {
        int totalAssets = assets.size();
        int rank = 1; // 순위는 1부터 시작

        for (int idx = 0; idx < totalAssets; idx++) {
            Asset asset = assets.get(idx);
            Double assetSharpeRatio = asset.getSharpeRatio();
            if(ObjectUtils.isEmpty(assetSharpeRatio)){ // assetSharpeRatio가 NULL인 경우, 전체 집단의 수를 줄인다
                totalAssets--;
                continue;
            }
            // Sharpe Ratio와 비교하여 순위를 계산
            if (assetSharpeRatio > sharpeRatio) {
                rank++; // Sharpe Ratio보다 더 나쁜 자산일 경우 순위를 올림
            }
        }

        return RiskRatio.of(totalAssets,rank); // 최종 순위 반환
    }

    /**
     *
     * @param portfolioAssetList : 포트폴리오에 담긴 asset List
     * @param assetList : 포트폴리오에 담긴 asset List(Entity 버전)
     * @param targetDate : 수익률을 계산할 날짜
     * @param timeInterval : 일 단위 수익률을 계산할지, 월 단위 수익률을 계산할지, 년 단위 수익률을 계산할지
     * @return
     */
    private Double getPortfolioReturn(List<PortfolioAsset> portfolioAssetList, List<Asset> assetList, LocalDateTime targetDate, TimeInterval timeInterval) {
        // 1. targetDate를 기준으로, 각 자산들의 보유량이 얼마였는지를 계산
        List<Integer> quantityList = portfolioAssetList.stream()
            .map(portfolioAsset -> getPastQuantity(portfolioAsset, targetDate))
            .toList();

        // 2. targetDate를 기준으로, 각 자산이 얼마였는지를 계산
        List<Double> assetPrices = assetHistoryService.getAssetHistoryList(assetList, targetDate)
            .stream()
            .map(AssetHistory::getPrice)
            .toList();

        // 3. quantityList와 assetPrices를 이용하여 targetDate 기준 포트폴리오 평가액을 계산
        Double valuation = IntStream.range(0, quantityList.size())
            .mapToDouble(i -> quantityList.get(i) * assetPrices.get(i))
            .sum();

        // 4. 다음 날짜 구하기
        LocalDateTime nextDate = dateUtil.getFutureDate(targetDate, timeInterval, 1);

        // 5. nextDate를 기준으로, 각 자산이 얼마였는지를 계산
        List<Double> nextAssetPrices = assetHistoryService.getAssetHistoryList(assetList, nextDate)
            .stream()
            .map(AssetHistory::getPrice)
            .toList();

        // 6. quantityList와 nextAssetPrices를 이용하여 nextDate 기준 포트폴리오 평가액을 계산
        Double nextValuation = IntStream.range(0, quantityList.size())
            .mapToDouble(i -> quantityList.get(i) * nextAssetPrices.get(i))
            .sum();

        // 7. 수익률 반환
        return (nextValuation - valuation) / valuation * 100;
    }

    private Double getHistoricValuation(List<PortfolioAsset> portfolioAssetList, List<Asset> assetList, LocalDateTime targetDate) {
//         특정 날짜의 자산 가격을 가져옴
        List<Double> assetPrices = assetHistoryService.getAssetHistoryList(assetList, targetDate)
            .stream()
            .map(AssetHistory::getPrice)
            .toList();

        // List<Double> assetPrices = assetHistoryService.getAssetHistoryList(assetList, targetDate)
        //     .stream()
        //     .peek(assetHistory -> log.warn("AssetId: {}, Price: {}", assetHistory.getAsset().getId(), assetHistory.getPrice()))
        //     .map(AssetHistory::getPrice)
        //     .toList();
        //
        // for(PortfolioAsset portfolioAsset : portfolioAssetList) {
        //     System.out.println("portfolioAsset.getAssetId() = " + portfolioAsset.getAssetId());
        // }


        List<Integer> quantityList = portfolioAssetList.stream()
            .map(portfolioAsset -> getPastQuantity(portfolioAsset, targetDate))
            .toList();

        // PortfolioAsset의 totalPurchaseQuantity와 assetPrices를 곱한 값을 합산
        return IntStream.range(0, assetPrices.size())
            .mapToDouble(i -> assetPrices.get(i) * quantityList.get(i))
            .sum();
    }

    private int getPastQuantity(PortfolioAsset portfolioAsset, LocalDateTime targetDate) {
        return portfolioAsset.getTotalPurchaseQuantity();
    }


    private Portfolio getCurrentPortfolio(User user) {
        List<Portfolio> myPortfolioList = portfolioRepository.getMyPortfolioList(user.getId());
        if (myPortfolioList.isEmpty()) return null;

        return myPortfolioList.get(0);
    }

       /**
     * 오늘자 자산의 가격을 가지고온다
     * (자산코드, 자산가격) 을 반환한다
     * @param assets
     * @return
     */
    private Map<String, Double> getTodayValueOfHoldings(List<PortfolioAsset> assets) {
        return assets.stream()
            .collect(Collectors.toMap(
                PortfolioAsset::getCode,
                asset -> {
                    // 오늘 일자의 자산 가격 가져오기
                    Asset todayAsset = assetRepository.findById(
                        asset.getAssetId()).orElseThrow(()  -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

                    // log.warn("recentAssetPrice : {}",todayAsset.getRecentPrice());

                    double totalPurchaseQuantity = asset.getTotalPurchaseQuantity();

                    return totalPurchaseQuantity * todayAsset.getRecentPrice();
                },
                Double::sum
            ));
    }

    /**
     */
    private Map<String, Double> getWeights(List<PortfolioAsset> portfolioAssets) {

        // 오늘일자 기준 포트폴리오 자산의 (자산코드,총가격)
        Map<String, Double> recentAssetPrice = getTodayValueOfHoldings(portfolioAssets);

        // 오늘일자 기준 총 자산 가치 계산
        Double totalRecentValueOfHolding = recentAssetPrice.values().stream()
            .mapToDouble(Double::doubleValue)
            .sum();

        return recentAssetPrice.entrySet().stream()
            .collect(Collectors.toMap(
                Entry::getKey,
                entry -> entry.getValue() * 100.0 / totalRecentValueOfHolding
            ));
    }

    private ResponseWithData<PortfolioResultDto> buildPortfolioResponse(double totalValuation, Portfolio portfolio, List<PortfolioAssetInfo> portfolioAssetInfoList, PortfolioPerformance portfolioPerformance, List<PortfolioRecommendResultDto> recommendAssetResponseResultDtoList) {
        PortfolioInfo portfolioInfo = PortfolioInfo.builder()
            .portfolioId(portfolio.getId())
            .totalCash(totalValuation)
            .performance(portfolioPerformance)
            .assets(portfolioAssetInfoList)
            .recommendAssets(recommendAssetResponseResultDtoList)
            .build();

        PortfolioResultDto portfolioResultDto = PortfolioResultDto.builder()
            .hasPortfolio(Boolean.TRUE)
            .portfolio(portfolioInfo)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(), "정상적인 응답을 반환하였습니다", portfolioResultDto);
    }

    private static List<Double> calculateWeights(List<Double> purchaseAmounts, double totalAmount) {
        return purchaseAmounts.stream()
            .map(amount -> amount / totalAmount)
            .toList();
    }

    /**
     * 각 자산별 평가액 리스트를 반환하는 함수
     * @param portfolioAssetList : 자산에 대한 정보 (List<PortfolioAsset> 형식)
     * @param assetList : 자산에 대한 정보(List<Asset> 형식)
     */
    private List<Double> getAssetValuationList(List<PortfolioAsset> portfolioAssetList, List<Asset> assetList) {
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        return IntStream.range(0, portfolioAssetList.size())
            .mapToObj(i -> {
                PortfolioAsset portfolioAsset = portfolioAssetList.get(i);
                Asset asset = assetList.get(i);
                double price = portfolioAsset.getTotalPurchaseQuantity() * asset.getRecentPrice();
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

    private ResponseWithData<PortfolioResultDto> buildPortfolioResponse() {
        PortfolioResultDto portfolioResultDto = PortfolioResultDto.builder()
            .hasPortfolio(Boolean.FALSE)
            .build();
        return new ResponseWithData<>(HttpStatus.OK.value(), "유저가 포트폴리오를 아직 만들지 않은 상태입니다", portfolioResultDto);
    }
    private PortfolioPerformance getPortfolioPerformance(List<Asset> assetList, List<Double> weights, double totalAmount) {
        // 성과 지표 계산 : expectedReturn, volatility, sharpeRatio
        Double expectedReturn = IntStream.range(0, assetList.size())
            .mapToDouble(i -> assetList.get(i).getExpectedReturn() * weights.get(i))
            .sum();

        List<AssetCovariance> assetCovarianceList = assetCovarianceRepository.findAllCovarianceIn(assetList);
        Double volatility = calculatePortfolioVariance(weights, assetCovarianceList, assetList);

        Double sharpeRatio = expectedReturn / volatility;


        return PortfolioPerformance.builder()
            .expectedReturn(expectedReturn)
            .volatility(volatility)
            .sharpeRatio(sharpeRatio)
            .valuation(totalAmount)
            .build();
    }

    /**
     * userId와 portfolioId를 이용해서 mongoDB에서 해당하는 포트폴리오를 찾아서 반환
     * 없을 경우 null을 반환
     * portfolioId에 해당하는 포트폴리오가 현재 유저의 포트폴리오인지 검증하는 로직 포함
     */
    private Portfolio getMyPortfolioById(Integer userId, String portfolioId) {
        Portfolio portfolio = portfolioRepository.getPortfolioById(portfolioId);
        if (portfolio == null) return null;
        if (!portfolio.getUserId().equals(userId)) throw new MutualRiskException(ErrorCode.PARAMETER_INVALID);
        return portfolio;
    }
}
