package com.example.mutualrisk.asset.service;

import static com.example.mutualrisk.asset.dto.AssetRequest.*;
import static com.example.mutualrisk.asset.dto.AssetResponse.*;

import com.example.mutualrisk.asset.dto.AssetResponse;
import com.example.mutualrisk.asset.dto.AssetResponse.AssetResultDto;
import com.example.mutualrisk.asset.entity.*;
import com.example.mutualrisk.asset.entity.ETFDetail;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetNewsRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.asset.repository.ETFDetailRepository;
import com.example.mutualrisk.asset.repository.InterestAssetRepository;
import com.example.mutualrisk.asset.repository.StockDetailRepository;
import com.example.mutualrisk.asset.repository.StockTrendRepository;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;
import com.example.mutualrisk.common.email.service.EmailService;
import com.example.mutualrisk.common.enums.Order;
import com.example.mutualrisk.common.enums.OrderCondition;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssetServiceImpl implements AssetService{

    private final AssetRepository assetRepository;
    private final AssetHistoryRepository assetHistoryRepository;
    private final UserRepository userRepository;
    private final InterestAssetRepository interestAssetRepository;
    private final AssetNewsRepository assetNewsRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final StockTrendRepository stockTrendRepository;
    private final StockDetailRepository stockDetailRepository;
    private final ETFDetailRepository etfDetailRepository;
    private final AssetHistoryService assetHistoryService;

    /**
     * 유저가 입력한 키워드를 통해 종목을 검색하는 메서드
     * @param keyword
     * @return
     */
    @Override
    @Transactional
    public ResponseWithData<AssetResultDto> searchByKeyword(String keyword) {
        List<Asset> assets = assetRepository.searchByKeyword(keyword);

        // 환율을 가져오는 메서드
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        List<AssetInfo> assetInfos = assets.stream()
            .map(asset -> getAssetInfo(asset,recentExchangeRate))
            .toList();

        AssetResultDto assetSearchResultDto = AssetResultDto.builder()
            .assetNum(assetInfos.size())
            .assets(assetInfos)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(), "종목 검색 결과 불러오기에 성공하였습니다", assetSearchResultDto);
    }
    /**
     * 유저가 추가한 관심자산을 조회하는 메서드
     * orderCondition(name,expectedReturn,price)과 order(ASC,DESC) 의 정렬기준에 따라 결과를 반환한다
     *
     * @param userId
     * @param orderCondition
     * @param order
     * @return
     */
    @Override
    @Transactional
    public ResponseWithData<AssetResultDto> getUserInterestAssets(Integer userId, OrderCondition orderCondition, Order order) {

        // 해당하는 유저가 존재하는지 찾는다
        User user = userRepository.findById(userId)
            .orElseThrow(()-> new MutualRiskException(ErrorCode.USER_NOT_FOUND));

        // 유저의 관심자산 목록을 조건에 맞춰 가지고 온다
        List<Asset> userInterestAssetList = interestAssetRepository.findUserInterestAssets(user,orderCondition,order).stream()
            .map(InterestAsset::getAsset)
            .toList();

        // log.warn("userInterestAssetList : {}", userInterestAssetList);

        // 관심자산이 없으면 바로 응답을 반환한다
        if(userInterestAssetList.isEmpty()){
            AssetResultDto result = AssetResultDto.builder()
                .build();
            return new ResponseWithData<>(HttpStatus.OK.value(),"유저 관심종목 조회 성공",result);
        }


        // 관심자산들 중, 첫번째 자산의 최근종가일 2개를 가지고온다
        // Todo : KR,US의 리스트를 따로 구분하여, 각각의 최근종가일을 구분하여 가져오기

        List<LocalDateTime> twoValidDate = assetHistoryService.getValidDate(userInterestAssetList.get(0),
            LocalDateTime.now(), 2);

        // log.warn("twoValidDate : {}",twoValidDate);

        // 환율을 가져오는 메서드
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();


        // 기존에는 오늘과 가장 근접한 영업일을 찾기위해 각 종목별로 (5일전~오늘) 사이에서
        // findRecentTwoAssetHistory를 통해 종목의 기록을 가져왔다면,
        // 지금은 일괄적으로 첫번째 자산의 영업일에 나머지 자산의 기록 또한 존재할 것이라 가정하고
        // 한번의 쿼리로 가져오게 된다
        // 단, 이것은 엄밀히 따져서 정확하지는 않다.. Todo를 해도 관심자산들 중에 해당 영업일에 종가가 없는
        // 자산이 존재할 수도 있다.

        // 관심자산의 최근 종가를 가지고 온다
        List<AssetHistory> recentHistory = assetHistoryRepository.findRecentHistoryOfAssetsBetweenDates(
            userInterestAssetList, twoValidDate.get(1), twoValidDate.get(0));

        // log.warn("자산의 최근 종가  : {}",recentHistory);

        // 1. AssetHistory를 Asset별로 그룹핑한다
        Map<Asset, List<AssetHistory>> assetHistoryMap = recentHistory.stream()
            .collect(Collectors.groupingBy(AssetHistory::getAsset));

        // log.warn("그룹핑 완료 : {}",assetHistoryMap);

        // 2. Asset을 각각의 AssetHistory와 매핑하여 AssetInfo 생성
        List<AssetInfo> userInterestAssetInfoList = userInterestAssetList.stream()
            .map(asset -> {
                // Asset에 대응하는 최근 2개의 AssetHistory를 가져온다
                return getAssetInfo(assetHistoryMap, recentExchangeRate, asset);
            })
            .toList();

        // log.warn("자산정보 생성 : {}",userInterestAssetInfoList);

        // 관심자산과 연관된 뉴스를 가지고온다
        List<NewsInfo> relatedNewsList = getRelatedNewsList(userInterestAssetList,assetHistoryMap,recentExchangeRate);

        // 결과를 DTO에 담아 반환한다
        AssetResultDto result = AssetResultDto.of(userInterestAssetInfoList,relatedNewsList);

        return new ResponseWithData<>(HttpStatus.OK.value(),"유저 관심종목 조회 성공",result);
    }

    /**
     *
     * 유저의 관심종목에 입력받은 자산을 추가한다
     *
     * @param asset
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public ResponseWithMessage addInterestAsset(Integer userId,InterestAssetInfo asset) {

        // 해당하는 유저가 존재하는지 찾는다
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.USER_NOT_FOUND));

        // 유저가 추가한 자산이 존재하는지 찾는다
        Asset findAsset = assetRepository.findById(asset.assetId())
            .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

        // 이미 유저의 관심목록에 존재하는지 찾는다
        interestAssetRepository.findUserInterestAsset(user, findAsset)
                .ifPresent(a -> { throw new MutualRiskException(ErrorCode.ASSET_ALREADY_EXIST);});

        // 유저의 관심자산을 담은 Entity를 생성한다
        InterestAsset interestAsset = InterestAsset.of(user,findAsset);

        // 유저의 관심자산을 저장한다
        interestAsset.setUser(user);
        interestAssetRepository.save(interestAsset);

        return new ResponseWithMessage(HttpStatus.OK.value(),"관심종목에 등록하였습니다");
    }

    /**
     * 유저의 관심종목에서 입력받은 종목을 삭제한다
     *
     * @param userId
     * @param assetId
     * @return
     */
    @Override
    public ResponseWithMessage deleteInterestAsset(Integer userId, Integer assetId) {

        // 해당하는 유저가 존재하는지 찾는다
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.USER_NOT_FOUND));

        // 유저가 관심종목에서 없애려는 자산이 DB에 존재하는지 찾는다
        Asset findAsset = assetRepository.findById(assetId)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

        // 유저의 관심종목에 asset이 있는지 확인한다
        InterestAsset userInterestAsset = interestAssetRepository.findUserInterestAsset(user, findAsset)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND_IN_USER_LIST));

        // 유저의 관심종목에서 해당 자산을 삭제한다
        interestAssetRepository.delete(userInterestAsset);

        return new ResponseWithMessage(HttpStatus.OK.value(),"관심종목에서 삭제되었습니다.");
    }

    /**
     * 입력받은 코드에 대한 자산을 반환하는 메서드
     * @param assetId
     * @return
     */
    @Override
    @Transactional
    public ResponseWithData<AssetResultDto> getAssetByAssetId(Integer assetId) {

        // 자산을 찾는다
        Asset findAsset = assetRepository.findById(assetId)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

        // 환율을 가져오는 메서드
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        // 최근 영업일 2개를 가져오는 메서드
        List<LocalDateTime> twoValidDate = assetHistoryService.getValidDate(findAsset,
            LocalDateTime.now(), 2);

        // 관심자산의 최근 종가를 가지고 온다
        List<AssetHistory> recentHistory = assetHistoryRepository.findRecentHistoryOfAssetsBetweenDates(
            List.of(findAsset), twoValidDate.get(1), twoValidDate.get(0));

        // 1. AssetHistory를 Asset별로 그룹핑한다
        Map<Asset, List<AssetHistory>> assetHistoryMap = recentHistory.stream()
            .collect(Collectors.groupingBy(AssetHistory::getAsset));

        // 2. Asset을 각각의 AssetHistory와 매핑하여 AssetInfo 생성
        List<AssetInfo> assetInfoList = List.of(findAsset).stream()
            .map(asset -> {
                // Asset에 대응하는 최근 2개의 AssetHistory를 가져온다
                return getAssetInfo(assetHistoryMap, recentExchangeRate, asset);
            })
            .toList();

        // log.warn("자산정보 생성 : {}",assetInfoList);

        // 관심자산과 연관된 뉴스를 가지고온다
        List<NewsInfo> newsList = getRelatedNewsList(List.of(findAsset),assetHistoryMap,recentExchangeRate);

        // 결과를 DTO에 담아 반환한다
        AssetResultDto result = AssetResultDto.builder()
            .assetNum(1)
            .assets(assetInfoList)
            .newsNum(newsList.size())
            .news(newsList)
            .build();
        return new ResponseWithData<>(HttpStatus.OK.value(), "종목 조회에 성공하였습니댜",result);
    }

    /**
     * 입력받은 국장 주식 자산에 대한 상세정보를 반환한다
     * 상세정보에는 주식 트렌드 및 per,pbr,eps,marketValue 가 있다
     * @param assetId
     * @return
     */
    @Override
    @Transactional
    public ResponseWithData<StockTrendWithDetail> getStockTrendWithDetail(Integer assetId) {

        // 자산의 trend를 가지고 온다
        List<StockRecord> stockRecord = stockTrendRepository.findByAssetId(assetId)
            .stream()
            .map(StockRecord::from)
            .toList();

        // 자산의 detail을 가지고 온다
        StockDetail stockDetail = stockDetailRepository.findByAssetId(assetId)
            .orElseGet(() -> maketDefaultDetail(assetId));

        StockTrendWithDetail stockTrendWithDetail = StockTrendWithDetail.of(stockRecord,stockDetail);

        return new ResponseWithData<>(HttpStatus.OK.value(),"종목 상세정보 조회에 성공하였습니다",stockTrendWithDetail);
    }

    /**
     * 입력받은 국장 ETF 자산에 대한 상세정보를 반환한다
     * @param assetId
     * @return
     */
    @Override
    public ResponseWithData<ETFInfo> getETFDetail(Integer assetId) {

        // 입력받은 자산을 가지고온다
        List<ETFDetail> etfDetails = etfDetailRepository.findByAssetId(assetId);

        if(etfDetails.isEmpty()){
            ETFInfo info = maketDefault(assetId);
            return new ResponseWithData<>(HttpStatus.OK.value(), "종목 상세정보 조회에 성공하였습니다",info);
        }

        // 자산에서 record를 추출한다
        List<ETFRecord> list = etfDetails.stream()
            .map(ETFRecord::from)
            .toList();

        // 반환할 DTO를 생성한다
        ETFInfo info = ETFInfo.of(etfDetails,list);

        return new ResponseWithData<>(HttpStatus.OK.value(), "종목 상세정보 조회에 성공하였습니다",info);
    }

    /**
     * assetId에 해당하는 ETF상세정보가 없을경우 빈 객체를 반환하는 메서드
     * @param assetId
     * @return
     */
    private static ETFInfo maketDefault(Integer assetId) {
        return ETFInfo.builder()
            .etfNum(0)
            .assetId(assetId)
            .code("N/A")
            .summary("N/A")
            .name("N/A")
            .portfolio(new ArrayList<>())
            .build();
    }

    /**
     * assetId에 해당하는 주식상세정보가 없을경우 빈 객체를 반환하는 메서드
     * @param assetId
     * @return
     */
    private static StockDetail maketDefaultDetail(Integer assetId) {
        return StockDetail.builder()
            .code("N/A")
            .marketValue("N/A")
            .per("N/A")
            .pbr("N/A")
            .eps("N/A")
            .asset(Asset.builder() // asset이 null일경우
                .id(assetId)
                .summary("N/A")
                .build())
            .build();
    }

    /**
     * 입력받은 자산의 가장 최근 종가를 가지고오는 메서드
     *
     * @param asset
     * @return
     */
    private AssetInfo getAssetInfo(Asset asset,Double recentExchangeRate) {

        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(5);

        log.warn("startDate : {}",startDate);
        log.warn("endDate : {}", endDate);

        List<AssetHistory> recentAssetHistoryList = assetHistoryRepository.findRecentHistoriesBetweenDates(asset,startDate,endDate);
        if (recentAssetHistoryList.size() < 2) throw new MutualRiskException(ErrorCode.ASSET_HISTORY_NOT_FOUND);

        // Todo: recentDate와 now 비교 로직 추가
//        LocalDate now = LocalDate.now();
//        LocalDate recentDate = LocalDate.from(recentAssetHistoryList.getDate());


        return AssetInfo.of(asset, recentAssetHistoryList, recentExchangeRate);
    }
    /**
     * 관심자산과 연관된 뉴스를 가져오는 메서드
     *
     * @param userInterestAssetList
     * @param recentExchangeRate
     * @return
     */
    private List<NewsInfo> getRelatedNewsList(List<Asset> userInterestAssetList,Map<Asset,List<AssetHistory>> assetHistoryMap,
        Double recentExchangeRate) {

        // 관심 자산에 대한 관련 뉴스 가져오기
        List<AssetNews> relatedAssetNews = assetNewsRepository.findByAssetIn(userInterestAssetList);

        // log.warn("자산관련 뉴스 : {}",relatedAssetNews);

        // 뉴스별로 관련된 AssetInfo와 함께 NewsInfo를 생성
        return relatedAssetNews.stream()
            .map(assetNews -> {
                News news = assetNews.getNews();

                // 해당 뉴스와 관련된 자산 정보 생성
                List<AssetInfo> relatedAssetInfoList = getRelatedAssetInfoList(userInterestAssetList,news, assetHistoryMap, recentExchangeRate);

                // 뉴스 정보를 정제하고 NewsInfo 생성
                String cleanedTitle = getCleanedTitle(news.getTitle());
                return NewsInfo.of(news,cleanedTitle,relatedAssetInfoList);
            })
            .toList();
    }

    /**
     * 뉴스와 연관된 자산을 가져오는 메서드
     * @param news
     * @param assetHistoryMap
     * @param recentExchangeRate
     * @return
     */
    private List<AssetInfo> getRelatedAssetInfoList(List<Asset> userInterestAssetList,News news, Map<Asset, List<AssetHistory>> assetHistoryMap, Double recentExchangeRate) {
        // 뉴스와 연관된 모든 자산을 가져옴
        List<AssetNews> assetNewsList = assetNewsRepository.findAllByNews(news,userInterestAssetList);

        // 연관된 자산을 기반으로 AssetInfo를 생성
        return assetNewsList.stream()
            .map(AssetNews::getAsset)
            .map(asset -> getAssetInfo(assetHistoryMap, recentExchangeRate, asset))
            .limit(5)
            .toList();

    }

    /**
     * 자산에 대한 종가 기록을 바탕으로 자산정보를 생성하는 메서드
     * @param assetHistoryMap
     * @param recentExchangeRate
     * @param asset
     * @return
     */
    private static AssetInfo getAssetInfo(Map<Asset, List<AssetHistory>> assetHistoryMap, Double recentExchangeRate,
        Asset asset) {
        // 해당 자산에 대응하는 AssetHistory를 가져옴
        List<AssetHistory> historiesForAsset = assetHistoryMap.get(asset);

        // AssetHistory가 없거나 부족하면 기본값 설정
        if (historiesForAsset == null || historiesForAsset.size() < 2) {
            historiesForAsset = List.of(AssetHistory.of(asset), AssetHistory.of(asset));
        }
        // AssetInfo 생성
        return AssetInfo.of(asset, historiesForAsset, recentExchangeRate);
    }
    /**
     * 제목에서 불필요한 html 태그 제거
     * @param title
     * @return
     */
    private String getCleanedTitle(String title) {
        // 1. HTML 태그(<b>, </b>) 제거
        String withoutTags = title.replaceAll("<.*?>", "");

        // 2. HTML 엔티티(&quot;) 제거
        String cleanText = withoutTags.replaceAll("&quot;", "'");

        // 결과 출력
        return cleanText;
    }

}
