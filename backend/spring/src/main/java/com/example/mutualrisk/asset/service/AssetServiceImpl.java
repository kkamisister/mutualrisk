package com.example.mutualrisk.asset.service;

import static com.example.mutualrisk.asset.dto.AssetRequest.*;
import static com.example.mutualrisk.asset.dto.AssetResponse.*;

import com.example.mutualrisk.asset.dto.AssetResponse.AssetResultDto;
import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.entity.InterestAsset;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.asset.repository.InterestAssetRepository;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;
import com.example.mutualrisk.common.enums.Order;
import com.example.mutualrisk.common.enums.OrderCondition;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssetServiceImpl implements AssetService{

    private final AssetRepository assetRepository;
    private final AssetHistoryRepository assetHistoryRepository;
    private final UserRepository userRepository;
    private final InterestAssetRepository interestAssetRepository;

    @Override
    @Transactional
    public ResponseWithData<AssetResultDto> searchByKeyword(String keyword) {
        List<Asset> assets = assetRepository.searchByKeyword(keyword);

        List<AssetInfo> assetInfos = assets.stream()
            .map(this::getAssetInfo)
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
        List<InterestAsset> userInterestAsset = interestAssetRepository.findUserInterestAssets(user);

        // 조건에 맞춰 정렬한다
        List<AssetInfo> userInterestAssets = userInterestAsset.stream()
            .map(InterestAsset::getAsset)
            .map(this::getAssetInfo)
            .sorted((a1, a2) -> sorting(orderCondition, order, a1, a2))
            .toList();

        // 결과를 DTO에 담아 반환한다
        AssetResultDto result = AssetResultDto.builder()
            .assetNum(userInterestAssets.size())
            .assets(userInterestAssets)
            .build();

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
     * @param asset
     * @return
     */
    @Override
    public ResponseWithMessage deleteInterestAsset(Integer userId, InterestAssetInfo asset) {

        // 해당하는 유저가 존재하는지 찾는다
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.USER_NOT_FOUND));

        // 유저가 관심종목에서 없애려는 자산이 DB에 존재하는지 찾는다
        Asset findAsset = assetRepository.findById(asset.assetId())
            .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND));

        // 유저의 관심종목에 asset이 있는지 확인한다
        InterestAsset userInterestAsset = interestAssetRepository.findUserInterestAsset(user, findAsset)
            .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND_IN_USER_LIST));

        // 유저의 관심종목에서 해당 자산을 삭제한다
        interestAssetRepository.delete(userInterestAsset);

        return new ResponseWithMessage(HttpStatus.OK.value(),"관심종목에서 삭제되었습니다.");
    }

    /**
     * 입력받은 정렬 기준에 따라 정렬하는 내부메서드
     *
     * @param orderCondition
     * @param order
     * @param a1
     * @param a2
     * @return
     */
    private static int sorting(OrderCondition orderCondition, Order order, AssetInfo a1, AssetInfo a2) {
        // orderCondition의 기본값을 name, order의 기본값을 asc로 설정
        int comparisonResult = 0;

        if (orderCondition == OrderCondition.NAME) {
            comparisonResult = a1.name().compareTo(a2.name());
        } else if (orderCondition == OrderCondition.PRICE) {
            comparisonResult = a1.price().compareTo(a2.price());
        }
        else if (orderCondition == OrderCondition.RETURN) {
            comparisonResult = a1.expectedReturn().compareTo(a2.expectedReturn());
        }

        if(order == Order.DESC){
            comparisonResult = -comparisonResult;
        }

        return comparisonResult;
    }

    /**
     * 입력받은 자산의 가장 최근 종가를 가지고 온다
     *
     * @param asset
     * @return
     */
    private AssetInfo getAssetInfo(Asset asset) {
        List<AssetHistory> recentAssetHistoryList = assetHistoryRepository.findRecentTwoAssetHistory(asset);
        if (recentAssetHistoryList.size() < 2) throw new MutualRiskException(ErrorCode.ASSET_HISTORY_NOT_FOUND);

        // Todo: recentDate와 now 비교 로직 추가
//        LocalDate now = LocalDate.now();
//        LocalDate recentDate = LocalDate.from(recentAssetHistoryList.getDate());


        return AssetInfo.of(asset, recentAssetHistoryList);
    }

}
