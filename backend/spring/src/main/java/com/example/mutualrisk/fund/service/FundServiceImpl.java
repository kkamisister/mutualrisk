package com.example.mutualrisk.fund.service;

import static com.example.mutualrisk.fund.dto.FundResponse.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.example.mutualrisk.asset.dto.AssetResponse.AssetInfo;
import com.example.mutualrisk.asset.service.AssetHistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

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

	private final AssetHistoryService assetHistoryService;
	private final FundRepository fundRepository;
	private final UserRepository userRepository;
	private final AssetRepository assetRepository;
	private final InterestAssetRepository interestAssetRepository;

	/**
	 * 전체 펀드 목록을 조회하는 메서드
	 * @return
	 */
	@Override
	public ResponseWithData<FundSummaryResultDto> getAllFunds(Integer userId) {

		// 유저를 가지고 온다
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new MutualRiskException(ErrorCode.USER_NOT_FOUND));

		// 유저의 관심자산 목록을 가지고온다
		List<InterestAsset> userInterestAssets = interestAssetRepository.findUserInterestAssets(user);

		// 펀드 정보를 가지고 온다
		List<Fund> allfunds = fundRepository.getAllFunds();

		// 펀드 정보를 dto로 변환한 리스트를 만든다
		List<FundSummaryInfo> fundSummarys = allfunds.stream()
			.map(FundSummaryInfo::from)
			.toList();

		// 총 보유량 및 구매량 종목을 가지고 온다
		Fund amount = fundRepository.getTopHoldAndBuyAmount()
			.orElseThrow(() -> new MutualRiskException(ErrorCode.NO_HOLD_AND_BUY_AMOUNT));

		// 이전 분기의 펀드를 가지고온다
		Optional<Fund> beforeQuarter = fundRepository.getBeforeQuarterTopHoldAndBuyAmount(amount);

		// 필요한 정보 : assetId,code,name,rank,interest,valueOfHolding,전체중에 차지하는 비중,현재 가격
		List<FundAsset> topHoldAsset = amount.getTopHoldAsset();
		List<FundAsset> topBuyAsset = amount.getTopBuyAsset();

		// 보유,구매 탑30 종목의 아이디들
		List<Integer> topHoldAssetIds = topHoldAsset.stream().map(FundAsset::getAssetId).toList();
		List<Integer> topBuyAssetIds = topBuyAsset.stream().map(FundAsset::getAssetId).toList();

		// 탑30 보유 및 구매 종목들
		List<Asset> holdAssets = assetRepository.findAllById(topHoldAssetIds);
		List<Asset> buyAssets = assetRepository.findAllById(topBuyAssetIds);

		// (자산ID,자산) 을 매핑한 맵
		Map<Integer, Asset> holdIdMap = holdAssets.stream().collect(Collectors.toMap(
			Asset::getId,
			asset -> asset
		));
		Map<Integer, Asset> buyIdMap = buyAssets.stream().collect(Collectors.toMap(
			Asset::getId,
			asset -> asset
		));

		List<FundAssetInfo> topHoldAssetInfos = topHoldAsset.stream()
			// 1. 펀드자산에 있는 자산 정보를 가지고 온다
			.filter(fundAsset -> !ObjectUtils.isEmpty(fundAsset.getAssetId())) // 기타인 경우 스킵
			.map(fundAsset -> {
				Asset asset = holdIdMap.get(fundAsset.getAssetId());

				// 2. rank를 구한다
				Integer rank = beforeQuarter
					.map(f -> calculateHoldRank(amount, f, asset.getId()))
					.orElse(null); // null인 경우는 새롭게 추가된 자산임

				// 3. interest를 구한다
				Boolean interest = userInterestAssets.stream()
					.anyMatch(interestAsset -> interestAsset.getAsset().getId().equals(asset.getId()));

				// 4. 정보를 담아서 반환한다
				return FundAssetInfo.of(fundAsset, asset, rank, interest, null);
			})
			.limit(10)
			.collect(Collectors.toList());

		List<FundAssetInfo> topBuyAssetInfos = topBuyAsset.stream()
			// 1. 펀드자산에 있는 자산 정보를 가지고 온다
			.filter(fundAsset -> !ObjectUtils.isEmpty(fundAsset.getAssetId())) // 기타인 경우 스킵
			.map(fundAsset -> {
				Asset asset = buyIdMap.get(fundAsset.getAssetId());

				// 2. rank를 구한다
				Integer rank = beforeQuarter
					.map(f -> calculateBuyRank(amount, f, asset.getId()))
					.orElse(null); // null인 경우는 새롭게 추가된 자산임

				// 3. interest를 구한다
				Boolean interest = userInterestAssets.stream()
					.anyMatch(interestAsset -> interestAsset.getAsset().getId().equals(asset.getId()));

				// 4. 정보를 담아서 반환한다
				return FundAssetInfo.of(fundAsset, asset, rank, interest, null);
			})
			.limit(10)
			.collect(Collectors.toList());


		// 결과를 resultDTO에 담아서 반환한다
		FundSummaryResultDto fundResultDto = FundSummaryResultDto.builder()
			.fundNum(fundSummarys.size())
			.funds(fundSummarys)
			.topHoldAndBuyAmount(FundTopHoldAndBuyAmountDto.of(topHoldAssetInfos,topBuyAssetInfos))
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

		// 펀드에 속한 자산의 ID리스트를 구한다
		List<Integer> assetIds = getAssetIds(fund);
		// 펀드가 가진 자산을 가지고온다
		List<Asset> assets = assetRepository.findAssetListWithIndustryAndSectorByIds(assetIds);

		// (자산ID,자산) 을 매핑한 맵
		Map<Integer, Asset> assetIdMap = assets.stream().collect(Collectors.toMap(
			Asset::getId,
			asset -> asset
		));

		// 섹터 편중 계산을 해야한다
		// 실제 자산을 순회하면서, 현재 펀드자산과 ID가 일치하는 자산에서 섹터 정보를 가지고와야한다
		Map<String, Long> sectorValueMap = new HashMap<>();
		Map<String,Integer> sectorIdMap = new HashMap<>();

		// 펀드에 포함된 자산을 비중의 내림차순으로 정렬한다
		List<FundAsset> fundAssets = fund.getAsset().stream()
			.sorted(Comparator.comparing(FundAsset::getValueOfHolding).reversed())
			.toList();

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

		// 유저의 관심자산 목록을 가지고온다
		List<InterestAsset> userInterestAssets = interestAssetRepository.findUserInterestAssets(user);

		// 필요한 정보 : assetId,code,name,rank,interest,valueOfHolding,전체중에 차지하는 비중,현재 가격
		List<FundAssetInfo> fundAssetInfos = fundAssets.stream()
			// 1. 펀드자산에 있는 자산 정보를 가지고 온다
			.filter(fundAsset -> !ObjectUtils.isEmpty(fundAsset.getAssetId())) // 기타인 경우 스킵
			.map(fundAsset -> {
				Asset asset = assetIdMap.get(fundAsset.getAssetId());

				// 2. rank를 구한다
				Integer rank = beforeQuarter
					.map(f -> calculateRank(fund, f, asset.getId()))
					.orElse(null); // null인경우는 새롭게 추가된 자산임

				// 3. interest를 구한다
				Boolean interest = userInterestAssets.stream()
					.anyMatch(interestAsset -> interestAsset.getAsset().getId().equals(asset.getId()));

				// 4. 전체 중에서 차지하는 비율을 찾는다
				Double ratio = fundAsset.getValueOfHolding() * 100.0 / fund.getValueOfHoldings();

				// 5. 정보를 담아서 반환한다
				return FundAssetInfo.of(fundAsset, asset, rank, interest, ratio);
			})
			.limit(10)
			.collect(Collectors.toList());


		// 결과를 반환한다
		FundResultDto fundResultDto = FundResultDto.builder()
			.fund(FundInfo.of(fund,fundAssetInfos))
			.sectors(sectorWeights)
			.build();

		return new ResponseWithData<>(HttpStatus.OK.value(),"펀드 상세조회에 성공하였습니다",fundResultDto);
	}

	/**
	 * 기간별 펀드자산 평가액 변동 기록을 반환하는 메서드
	 *
	 * @param userId
	 * @param period
	 * @return
	 */
	@Override
	public ResponseWithData<List<FundReturnDto>> getHistory(Integer userId, String company, Integer period) {

		// S&P 500 자산을 가지고온다
		Asset sp500 = assetRepository.findById(3621)
			.orElseThrow(() -> new MutualRiskException(ErrorCode.SP_NOT_FOUND));

		// 입력받은 펀드의 현재시점으로부터 period 전의 펀드 데이터를 구한다
		List<Fund> fundsByPeriod = fundRepository.getFundsByPeriod(company, period);

		List<FundReturnDto> fundReturnDtoList = IntStream.range(0, fundsByPeriod.size())
			.mapToObj(i -> {
				var fund = fundsByPeriod.get(i);
				Double fundReturn = getFundReturn(fund, 3);
				Double sp500Return = getAssetReturn(sp500, fund.getSubmissionDate().withHour(0), 3);
				return FundReturnDto.builder()
					.submissionDate(YearQuarter.of(fund.getSubmissionDate()))
					.fundReturns(fundReturn)
					.sp500Returns(sp500Return)
					.build();
			})
			.toList();

		return new ResponseWithData<>(HttpStatus.OK.value(), "데이터 정상 반환", fundReturnDtoList);
	}


	private Double getAssetReturn(Asset asset, LocalDateTime startTime, int dMonth) {
		Double assetPrice = assetHistoryService.getAssetPrice(asset, startTime);
		LocalDateTime nextTime = startTime.plusMonths(dMonth);
		Double nextPrice = assetHistoryService.getAssetPrice(asset, nextTime);

		return (nextPrice - assetPrice) / assetPrice * 100;
	}

	// 펀드의 수익률 계산
	private Double getFundReturn(Fund fund, int dMonth) {
		LocalDateTime targetDate = fund.getSubmissionDate().withHour(0).minusMonths(dMonth);

		List<Long> valueOfHoldingList = new ArrayList<>();
		List<FundAsset> topHoldAsset = fund.getTopHoldAsset();
		List<Integer> assetIdList = new ArrayList<>();

		for (FundAsset fundAsset : topHoldAsset) {
			if (fundAsset.getCode().equals("-1")) continue;
			Integer assetId = fundAsset.getAssetId();
			assetIdList.add(assetId);
			valueOfHoldingList.add(fundAsset.getValueOfHolding());
		}

		List<Asset> assetList = assetRepository.findAssetListWithIndustryAndSectorByIds(assetIdList);

		List<AssetHistory> prevAssetHistoryList = assetHistoryService.getAssetHistoryList(assetList, targetDate);
		List<Double> assetPrices = prevAssetHistoryList.stream()
			.map(AssetHistory::getPrice)
			.toList();

		LocalDateTime nextDate = targetDate.plusMonths(dMonth);
		List<AssetHistory> nextAssetHistoryList = assetHistoryService.getAssetHistoryList(assetList, nextDate);
		List<Double> nextPrices = nextAssetHistoryList.stream()
			.map(AssetHistory::getPrice)
			.toList();

		// totalValueOfHolding 계산
		long totalValueOfHolding = valueOfHoldingList.stream()
			.mapToLong(Long::longValue)
			.sum();

		// changeValueOfHolding 계산
		double changeValueOfHolding = IntStream.range(0, assetPrices.size())
			.mapToDouble(i -> {
				double assetPrice = assetPrices.get(i);
				double nextAssetPrice = nextPrices.get(i);
				long valueOfHolding = valueOfHoldingList.get(i);
				return ((nextAssetPrice - assetPrice) / assetPrice) * valueOfHolding;
			})
			.sum();

		return changeValueOfHolding / totalValueOfHolding * 100;
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
			.filter(fundAsset -> !fundAsset.getName().equals("기타"))
			.map(FundAsset::getAssetId).toList();
	}

	/**
	 * 탑30 보유량의 전/후 분기 대비 순위상승량을 계산한다
	 * @param curFund
	 * @param beforeFund
	 * @param assetId
	 * @return
	 */
	private static Integer calculateHoldRank(Fund curFund,Fund beforeFund,Integer assetId) {

		// beforeFund에서 asset의 인덱스를 찾음
		List<FundAsset> beforeAssets = beforeFund.getTopHoldAsset();
		int beforeIndex = findAssetIndex(beforeAssets, assetId);

		// curFund에서 asset의 인덱스를 찾음
		List<FundAsset> curAssets = curFund.getTopHoldAsset();
		int curIndex = findAssetIndex(curAssets, assetId);

		// 1. beforeFund가 없는경우 -> 순위변화 : 0
		if(beforeIndex == -1)return 0;
			// 2. beforeFund가 있는경우 -> 순위변화를 반환
		else{
			return beforeIndex - curIndex;
		}
	}

	/**
	 * 탑30 구매량의 전/후 분기 대비 순위상승량을 계산한다
	 * @param curFund
	 * @param beforeFund
	 * @param assetId
	 * @return
	 */
	private static Integer calculateBuyRank(Fund curFund,Fund beforeFund,Integer assetId) {

		// beforeFund에서 asset의 인덱스를 찾음
		List<FundAsset> beforeAssets = beforeFund.getTopBuyAsset();
		int beforeIndex = findAssetIndex(beforeAssets, assetId);

		// curFund에서 asset의 인덱스를 찾음
		List<FundAsset> curAssets = curFund.getTopBuyAsset();
		int curIndex = findAssetIndex(curAssets, assetId);

		// 1. beforeFund가 없는경우 -> 순위변화 : 0
		if(beforeIndex == -1)return 0;
			// 2. beforeFund가 있는경우 -> 순위변화를 반환
		else{
			return beforeIndex - curIndex;
		}
	}

	/**
	 * 두 펀드의 순위 변화를 반환하는 메서드
	 *
	 * 이전에 없던 자산인 경우, 0을 반환
	 * 있던 자산의 경우 인덱스의 차이를 반환
	 * @param curFund
	 * @param beforeFund
	 * @param assetId
	 * @return
	 */
	private static Integer calculateRank(Fund curFund,Fund beforeFund,Integer assetId) {

		// beforeFund에서 asset의 인덱스를 찾음
		List<FundAsset> beforeAssets = beforeFund.getAsset();
		int beforeIndex = findAssetIndex(beforeAssets, assetId);

		// curFund에서 asset의 인덱스를 찾음
		List<FundAsset> curAssets = curFund.getAsset();
		int curIndex = findAssetIndex(curAssets, assetId);

		// 1. beforeFund가 없는경우 -> 순위변화 : 0
		if(beforeIndex == -1)return 0;
		// 2. beforeFund가 있는경우 -> 순위변화를 반환
		else{
			return beforeIndex - curIndex;
		}
	}

	/**
	 * 배열을 돌면서 매칭되는 자산ID를 찾는 메서드
	 * @param assets
	 * @param assetId
	 * @return
	 */
	private static int findAssetIndex(List<FundAsset> assets,Integer assetId) {
		for (int i = 1; i < assets.size(); i++) {
			if (assets.get(i).getAssetId().equals(assetId)) {
				return i;
			}
		}
		return -1;  // Asset이 리스트에 없을 경우 -1 반환
	}
}
