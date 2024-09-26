package com.example.mutualrisk.fund.service;

import static com.example.mutualrisk.fund.dto.FundResponse.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.entity.InterestAsset;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.asset.repository.InterestAssetRepository;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.fund.dto.FundResponse.FundAssetInfo;
import com.example.mutualrisk.fund.dto.FundResponse.FundResultDto;
import com.example.mutualrisk.fund.dto.FundResponse.FundSummaryResultDto;
import com.example.mutualrisk.fund.dto.FundResponse.FundSummaryInfo;
import com.example.mutualrisk.fund.dto.FundResponse.SectorInfo;
import com.example.mutualrisk.fund.entity.Fund;
import com.example.mutualrisk.fund.entity.FundAsset;
import com.example.mutualrisk.fund.repository.FundRepository;
import com.example.mutualrisk.sector.entity.Sector;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FundServiceImpl implements FundService {

	private final FundRepository fundRepository;
	private final UserRepository userRepository;
	private final AssetRepository assetRepository;
	private final AssetHistoryRepository assetHistoryRepository;
	private final InterestAssetRepository interestAssetRepository;

	/**
	 * 전체 펀드 목록을 조회하는 메서드
	 * @return
	 */
	@Override
	public ResponseWithData<FundSummaryResultDto> getAllFunds() {

		// 펀드 정보를 가지고 온다
		List<Fund> allfunds = fundRepository.getAllFunds();

		// 펀드 정보를 dto로 변환한 리스트를 만든다
		List<FundSummaryInfo> fundSummarys = allfunds.stream()
			.map(FundSummaryInfo::from)
			.toList();

		// 총 보유량 및 구매량 종목을 가지고 온다
		Fund topHoldAndBuyAmount = fundRepository.getTopHoldAndBuyAmount()
			.orElseThrow(() -> new MutualRiskException(ErrorCode.NO_HOLD_AND_BUY_AMOUNT));

		// 결과를 resultDTO에 담아서 반환한다
		FundSummaryResultDto fundResultDto = FundSummaryResultDto.builder()
			.fundNum(fundSummarys.size())
			.funds(fundSummarys)
			.topHoldAndBuyAmount(topHoldAndBuyAmount)
			.build();

		return new ResponseWithData<>(HttpStatus.OK.value(),"펀드 조회에 성공하였습니다",fundResultDto);
	}

	/**
	 * 펀드 상세보기를 클릭하면 나타나는 정보를 가져오기위한 메서드
	 *
	 * 펀드의 총 가치, 펀드가 가진 자산의 수, 회전율, 가치변화 , 회사명, CEO명, 제출일
	 *
	 * 종목 보유량(보유량 순)
	 * - 종목이름,종목코드,가치, 이전분기 대비 순위상승,유저의 관심목록에 있는지 여부
	 * 섹터 편중
	 *
	 * 자산 평가액 변동 기록
	 * - 포트폴리오에 속한 자산의 일종의 백테스팅
	 *
	 *
	 * @return
	 */
	@Override
	public ResponseWithData<FundResultDto> getFund(Integer userId,String fundId) {

		// 유저를 가지고 온다
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new MutualRiskException(ErrorCode.USER_NOT_FOUND));

		// 펀드를 가지고 온다
		Fund fund = fundRepository.getFund(fundId)
			.orElseThrow(() -> new MutualRiskException(ErrorCode.FUND_NOT_FOUND));

		// 펀드가 가진 자산을 가지고온다
		List<Asset> assets = assetRepository.findByIds(getAssetIds(fund));

		// Todo: 실제 종목별 업데이트 시간 반영하도록 Refactor 필요
		LocalDateTime recentDate = getMostRecentDate();

		// 각 자산의 최근 종가를 검색하여 (자산,종가)의 맵을 만든다
		Map<Asset, Double> assetPrice = assetHistoryRepository.findRecentHistoryOfAssets(assets, recentDate).stream()
			.collect(Collectors.toMap(
				AssetHistory::getAsset,  // AssetHistory에서 Asset을 가져옴
				assetHistory -> assetHistory.getPrice() != null ? assetHistory.getPrice() : 0.0 // 가격이 null인 경우 0.0 반환
			));


		// 섹터 편중 계산을 해야한다
		// 실제 자산을 순회하면서, 현재 펀드자산과 ID가 일치하는 자산에서 섹터 정보를 가지고와야한다
		Map<String, Long> sectorValueMap = new HashMap<>();
		Map<String,Integer> sectorIdMap = new HashMap<>();

		List<FundAsset> fundAssets = fund.getAsset();
		for (FundAsset fundAsset : fundAssets) {
			// 자산과 FundAsset을 매핑하여 해당 자산의 Sector를 찾음
			Optional<Sector> sector = assets.stream()
				.filter(asset -> asset.getId().equals(fundAsset.getAssetId())) // Asset ID가 일치하는 자산 필터링
				.findFirst()
				.map(asset -> asset.getIndustry().getSector());// 섹터 정보 반환

			if (sector.isPresent()) {
				// 자산이 존재할 때는 해당 섹터에 valueOfHolding 누적
				String sectorName = sector.get().getName();
				sectorValueMap.merge(sectorName, fundAsset.getValueOfHolding(), Long::sum);
				sectorIdMap.put(sectorName,sector.get().getId());
			} else {
				// 자산이 없을 경우, 이름이 "기타"인 자산을 따로 처리
				sectorValueMap.put("기타자산 및 채권",fundAsset.getValueOfHolding());
			}
		}


		// 비율 계산을 해야한다
		// 비율은, 각 섹터별 [Holding / (전체 valueOfHoldings)] * 100.0 으로 정의한다
		Long valueOfHoldings = fund.getValueOfHoldings();
		List<SectorInfo> sectorWeights = sectorValueMap.entrySet().stream()
			.map(entry -> getSectorInfo(entry, valueOfHoldings,sectorIdMap))
			.collect(Collectors.toList());

		// 이전 분기의 펀드를 가지고온다
		Optional<Fund> beforeQuarter = fundRepository.getBeforeQuarter(fund);
		log.warn("beforeQuarter : {}",beforeQuarter.get().getTopHoldAsset());

		// 유저의 관심자산 목록을 가지고온다
		List<InterestAsset> userInterestAssets = interestAssetRepository.findUserInterestAssets(user);

		// 펀드의 자산정보를 가지고 온다
		List<FundAssetInfo> fundAssetInfos = assets.parallelStream()
			.map(asset -> {
				//1. 해당 펀드자산의 일별 종가를 가지고온다
				List<AssetHistory> recentAssetHistoryList = assetHistoryRepository.findRecentTwoAssetHistory(asset);

				//Todo: 종가 기록이 1개이거나 없는경우 처리

				//2. 변화량을 계산한다
				AssetHistory mostRecentAssetHistory = recentAssetHistoryList.get(0);
				AssetHistory secondRecentAssetHistory = recentAssetHistoryList.get(1);

				Double price1 = mostRecentAssetHistory.getPrice();
				Double price2 = secondRecentAssetHistory.getPrice();

				Double dailyPriceChangeRate = (price1 - price2) / price2 * 100;

				// 3. rank 구하기
				// 현재 fund와 전 분기 fund의 topHoldAsset을 비교하여, 자산의 순위변화를 찾는다
				Integer rank = beforeQuarter
					.map(f -> calculateRank(fund, f, asset.getId()))
					.orElse(0);

				// 4. interest 구하기
				// 현재 로그인한 유저의 관심종목에 포함되어있는지 여부를 반환한다
				Boolean interest = userInterestAssets.stream()
					.anyMatch(interestAsset -> interestAsset.getAsset().getId().equals(asset.getId()));

				//5. valueOfHolding를 구한다
				FundAsset fundAsset = fund.getAsset().stream()
					.skip(1)
					.filter(item -> item.getAssetId().equals(asset.getId()))
					.findFirst()
					.orElse(FundAsset.builder().build()); // 없으면 빈 객체 반환

				return FundAssetInfo.of(fundAsset, dailyPriceChangeRate,mostRecentAssetHistory.getPrice(),rank, interest);
			})
			.limit(30) // 최대 30개만
			.collect(Collectors.toList());

		// 결과를 반환한다
		FundResultDto fundResultDto = FundResultDto.builder()
			.fund(FundInfo.of(fund,fundAssetInfos))
			.sectors(sectorWeights)
			.build();


		return new ResponseWithData<>(HttpStatus.OK.value(),"펀드 상세조회에 성공하였습니다",fundResultDto);
		// return new ResponseWithData<>(HttpStatus.OK.value(),"펀드 상세조회에 성공하였습니다",null);
	}

	/**
	 * 기간별 펀드자산 평가액 변동 기록을 반환하는 메서드
	 *
	 * @param userId
	 * @param period
	 * @return
	 */
	@Override
	public ResponseWithData<List<FundPortfolioRecord>> getHistory(Integer userId, String company,Integer period) {

		// S&P 500 자산을 가지고온다
		Asset sp500 = assetRepository.findByCode("360750")
			.orElseThrow(() -> new MutualRiskException(ErrorCode.SP_NOT_FOUND));

		log.warn("sp500 :  {}",sp500);

		// 입력받은 펀드의 현재시점으로부터 period 전의 펀드 데이터를 구한다
		List<Fund> fundsByPeriod = fundRepository.getFundsByPeriod(company, period);
		log.warn("fundsByPeriod : {}",fundsByPeriod);

		// 펀드의 최초 데이터를 변동기록 그래프의 시작점으로 설정한다
		Double initFundValue = 0.0;

		// S&P 500의 초기 값
		AssetHistory sp500InitialHistory = null;

		if (!fundsByPeriod.isEmpty()) {
			initFundValue = (double)fundsByPeriod.get(0).getValueOfHoldings();

			// S&P 500의 초기값은 첫 번째 펀드의 제출일을 기준으로 설정
			LocalDateTime submissionDate = fundsByPeriod.get(0).getSubmissionDate();
			log.warn("submissionDate : {}",submissionDate);

			sp500InitialHistory = assetHistoryRepository.findRecentHistoryOfAsset(sp500, submissionDate)
				.orElseGet(this::getsp500Price);
		}

		// 직전 분기의 가치
		Double previousSp500Value = sp500InitialHistory.getPrice();

		List<FundPortfolioRecord> record = new ArrayList<>();
		for(Fund fund : fundsByPeriod) {
			log.warn("여기 도착");
			// 각 분기별 포트폴리오의 누적 valueOfHolding을 구한다
			LocalDateTime submissionDate = fund.getSubmissionDate();

			log.warn("submissionDate2 : {}",submissionDate);

			// 제출일(연도,분기)을 담을 객체
			SubmissionDate subDate = SubmissionDate.of(submissionDate);

			log.warn("subDate : {}",subDate);

			// submissionDate의 S&P500의 가치 추정
			AssetHistory sp500History = assetHistoryRepository.findRecentHistoryOfAsset(sp500,
				submissionDate).orElseGet(this::getsp500Price);

			// S&P500 변동률 계산
			Double sp500ChangeRate = Math.abs((sp500History.getPrice() - previousSp500Value)/previousSp500Value * 100.0);

			// 펀드의 현재 가치
			Double curFundValue = (double)fund.getValueOfHoldings();

			// S&P 500의 초기값(=initFundValue)에 변동률을 반영하여 추정된 S&P 500 가치를 계산
			Double estimatedSp500Value = initFundValue + Math.round(initFundValue * sp500ChangeRate);

			previousSp500Value+=(previousSp500Value * sp500ChangeRate);

			//(펀드가치,sp500가치,분기)
			FundPortfolioRecord fundPortfolioRecord = FundPortfolioRecord.of(subDate, curFundValue,
				estimatedSp500Value);

			record.add(fundPortfolioRecord);
		}
		return new ResponseWithData<>(HttpStatus.OK.value(),"자산 변동 조회 성공",record);
	}

	// dateTime에 종가가 존재하지 않으면 실행될 메서드
	// Todo: 현재~해당 시점 전후로 비교하여 값 넣기
	private AssetHistory getsp500Price() {
		return null;
	}

	/**
	 * 가장 최근날짜를 반환.
	 * Todo: 실제 데이터가 들어있는 요일을 찾아야함
	 * @return
	 */
	private static LocalDateTime getMostRecentDate() {
		return LocalDate.of(2024,9,24).atStartOfDay();
	}
	/**
	 * 각 섹터의 비중을 구한 정보를 반환하는 메서드
	 * @param entry
	 * @param valueOfHoldings
	 * @return
	 */
	private static SectorInfo getSectorInfo(Entry<String, Long> entry, Long valueOfHoldings,Map<String,Integer> sectorIdMap) {
		// 섹터를 생성
		Sector sector = Sector.of(sectorIdMap.get(entry.getKey()),entry.getKey());
		Long holding = entry.getValue();

		Double ratio;
		try {
			ratio = (1.0*holding / valueOfHoldings) * 100.0;
		} catch (ArithmeticException e) {
			// 분모가 0인 경우
			ratio = 0.0;
		}
		return SectorInfo.of(sector, ratio);
	}

	/**
	 * 펀드에 속한 자산의 ID를 반환하는 메서드
	 * @param fund
	 * @return
	 */
	private static List<Integer> getAssetIds(Fund fund) {
		return fund.getAsset().stream()
			.map(FundAsset::getAssetId).toList();
	}

	private static Integer calculateRank(Fund curFund,Fund beforeFund,Integer assetId) {

		// beforeFund에서 asset의 인덱스를 찾음
		List<FundAsset> beforeAssets = beforeFund.getAsset();
		int beforeIndex = findAssetIndex(beforeAssets, assetId);

		// curFund에서 asset의 인덱스를 찾음
		List<FundAsset> curAssets = curFund.getAsset();
		int curIndex = findAssetIndex(curAssets, assetId);

		System.out.println("(curIndex,beforeIndex) : "+curIndex+" "+beforeIndex+" "+assetId);

		// 1. beforeFund가 없는경우 -> 순위변화 : 0
		if(beforeIndex == -1)return 0;
		// 2. beforeFund가 있는경우 -> 순위변화를 반환
		else{
			return beforeIndex - curIndex;
		}
	}


	private static int findAssetIndex(List<FundAsset> assets,Integer assetId) {
		for (int i = 1; i < assets.size(); i++) {
			if (assets.get(i).getAssetId().equals(assetId)) {
				return i;
			}
		}
		return -1;  // Asset이 리스트에 없을 경우 -1 반환
	}
}
