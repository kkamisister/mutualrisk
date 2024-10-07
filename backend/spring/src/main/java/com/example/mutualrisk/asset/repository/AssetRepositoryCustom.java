package com.example.mutualrisk.asset.repository;

import com.example.mutualrisk.asset.entity.Asset;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssetRepositoryCustom {
    List<Asset> searchByKeyword(@Param("keyword") String keyword);

    List<Asset> findAssetListWithIndustryAndSectorByIds(List<Integer> ids);

    List<Asset> findAssetsNotInList(List<Integer> ids, int sectorId);

}
