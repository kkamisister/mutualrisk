package com.example.mutualrisk.asset.service;

import static com.example.mutualrisk.asset.dto.AssetRequest.*;

import com.example.mutualrisk.asset.dto.AssetResponse.AssetResultDto;
import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;

public interface AssetService {
    ResponseWithData<AssetResultDto> searchByKeyword(String keyword);

    ResponseWithData<AssetResultDto> getUserInterestAssets(Integer userId,String orderCondition,String order);

    ResponseWithMessage addInterestAsset(Integer userId,InterestAssetInfo asset);

	ResponseWithMessage deleteInterestAsset(Integer userId, InterestAssetInfo asset);
}
