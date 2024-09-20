package com.example.mutualrisk.asset.service;

import com.example.mutualrisk.asset.dto.AssetRequest;
import com.example.mutualrisk.asset.dto.AssetResponse;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.common.dto.CommonResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AssetServiceImplTest {

    @InjectMocks
    private AssetServiceImpl assetService;

    @Mock
    private AssetRepository assetRepository;

    @Mock
    private AssetHistoryRepository assetHistoryRepository;

    @Test
    void searchByKeyword() {

    }
}