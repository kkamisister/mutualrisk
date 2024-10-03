package com.example.mutualrisk.asset.service;

import com.example.mutualrisk.asset.dto.AssetResponse;
import com.example.mutualrisk.asset.dto.AssetResponse.AssetPriceWithDate;
import com.example.mutualrisk.asset.dto.AssetResponse.AssetRecentHistory;
import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AssetHistoryServiceImpl implements AssetHistoryService {

    private final AssetHistoryRepository assetHistoryRepository;
    private final AssetRepository assetRepository;

    // 주어진 날짜에 해당하는 asset의 종가 데이터를 구하는 함수
    // 현재 날 기준으로 과거 5일간의 데이터를 가져온다. 이 중 가장 마지막 데이터를 선택
    // (해당 날짜가 비영업일일 수도 있기 때문)
    @Override
    public Double getAssetPrice(Asset asset, LocalDateTime targetDate) {
        LocalDateTime pastDate = targetDate.minusDays(5);

        List<AssetHistory> assetHistories = assetHistoryRepository.findRecentHistoriesBetweenDates(asset, pastDate, targetDate);

        // 5일간의 데이터가 모두 없을 경우, 에러 반환
        if (assetHistories.isEmpty()) throw new MutualRiskException(ErrorCode.ASSET_HISTORY_NOT_FOUND);

        // 가장 마지막 종가 데이터를 반환
        return assetHistories.get(assetHistories.size()-1).getPrice();
    }

    @Override
    public List<AssetHistory> getAssetHistoryList(List<Asset> assetList, LocalDateTime targetDate) {
        LocalDateTime validDate = getValidDate(assetList.get(0), targetDate, 1).get(0);
        return assetHistoryRepository.findHistoryOfAssets(assetList, validDate);
    }

    @Override
    // targetDate와 가장 가까운 영업일 날짜 n개를 반환하는 함수
    public List<LocalDateTime> getValidDate(Asset asset, LocalDateTime targetDate, int num) {
        LocalDateTime startDate = targetDate.minusDays(10 * num);

        List<AssetHistory> recentHistoriesBetweenDates = assetHistoryRepository.findRecentHistoriesBetweenDates(asset,
            startDate, targetDate);

        if (recentHistoriesBetweenDates.size() < num) throw new MutualRiskException(ErrorCode.ASSET_HISTORY_NOT_FOUND);

        List<LocalDateTime> validDates = new ArrayList<>();
        for (int i = 0; i < num; i++) {
            validDates.add(recentHistoriesBetweenDates.get(recentHistoriesBetweenDates.size() - 1 - i).getDate());
        }

        return validDates;
    }

    /**
     * 자산의 최근 영업일 period 기간 동안의 종가를 반환하는 메서드
     *
     * @param assetId
     * @param period
     * @return
     */
    @Override
    @Transactional
    public ResponseWithData<AssetRecentHistory> getAssetRecentHistory(Integer assetId, Integer period,Integer offset) {

        // 자산을 찾는다
        Asset findAsset = assetRepository.findById(assetId)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));


        // period 동안의 자산 정보를 조회한다
        List<AssetHistory> recentPriceHistory = assetHistoryRepository.findRecentHistoryOfAsset(
            findAsset, period,offset);


        // DTO에 담아 반환한다
        List<AssetPriceWithDate> assetPriceWithDate = recentPriceHistory.stream()
            .map(assetHistory -> AssetPriceWithDate.of(assetHistory.getPrice(),assetHistory.getDate()))
            .toList();

        AssetRecentHistory assetRecentHistory = AssetRecentHistory.builder()
            .assetId(findAsset.getId())
            .recordNum(assetPriceWithDate.size())
            .records(assetPriceWithDate)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(),"자산 기록 조회에 성공하였습니다",assetRecentHistory);
    }
}
