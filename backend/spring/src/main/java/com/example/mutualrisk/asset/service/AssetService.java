package com.example.mutualrisk.asset.service;

import com.example.mutualrisk.asset.dto.AssetRequest;
import com.example.mutualrisk.asset.dto.AssetResponse;
import com.example.mutualrisk.common.dto.CommonResponse;
import org.springframework.stereotype.Service;

public interface AssetService {
    CommonResponse.ResponseWithData<AssetResponse.AssetSearchResultDto> searchByKeyword(String keyword);
}
