package com.example.mutualrisk.asset.service;

import com.example.mutualrisk.asset.dto.AssetResponse;
import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.entity.Region;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssetServiceImpl implements AssetService{

    private final AssetRepository assetRepository;
    private final AssetHistoryRepository assetHistoryRepository;

    @Override
    @Transactional
    public CommonResponse.ResponseWithData<AssetResponse.AssetSearchResultDto> searchByKeyword(String keyword) {
        List<Asset> assets = assetRepository.searchByKeyword(keyword);
        LocalDate now = LocalDate.now();

        List<AssetResponse.AssetInfo> assetInfos = assets.stream()
            .map(
                asset -> {
                    log.info("asset : {}", asset);
                    AssetHistory byAssetAndDate = assetHistoryRepository.findRecentAssetHistory(asset)
                        .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_HISTORY_NOT_FOUND));

                    LocalDate recentDate = LocalDate.from(byAssetAndDate.getDate());
                    // Todo: recentDate와 now 비교 로직 추가

                    String imageName = asset.getRegion().equals(Region.KR)? asset.getCode() + ".svg": asset.getCode() + ".png";

                    return AssetResponse.AssetInfo.builder()
                        .assetId(asset.getId())
                        .name(asset.getName())
                        .code(asset.getCode())
                        .imagePath("/stockImage")
                        .imageName(imageName)
                        .returns(asset.getExpectedReturn())
                        .price(byAssetAndDate.getPrice())
                        .build();
                }
            )
            .toList();

        AssetResponse.AssetSearchResultDto assetSearchResultDto = AssetResponse.AssetSearchResultDto.builder()
            .assetNum(assetInfos.size())
            .assets(assetInfos)
            .build();

        return new CommonResponse.ResponseWithData<>(HttpStatus.OK.value(), "종목 검색 결과 불러오기에 성공하였습니다", assetSearchResultDto);
    }
}
