package com.example.mutualrisk.test.controller;

import static com.example.mutualrisk.asset.dto.AssetResponse.*;
import static com.example.mutualrisk.fund.dto.FundResponse.*;

import java.util.Arrays;
import java.util.List;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.email.dto.EmailMessage;
import com.example.mutualrisk.common.email.service.EmailService;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.fund.service.FundService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 테스트용 컨트롤러
 * jwt 로직에서 제외시킴(검증 로직 x)
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/test")
public class TestController {

    private final FundService fundService;
    private final AssetRepository assetRepository;
    private final AssetHistoryRepository assetHistoryRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final EmailService emailService;

    @GetMapping("/hello")
    public String hello() {
        throw new MutualRiskException(ErrorCode.SOME_ERROR_RESPONSE);
    }

    @GetMapping("/mongo")
    public ResponseWithData<FundSummaryResultDto> mongoTest(){
        return fundService.getAllFunds();
    }

    @GetMapping("/asset")
    public ResponseWithData<?> assetTest(){
        List<Asset> assets = assetRepository.findByIds(Arrays.asList(1, 2, 3));

        List<AssetInfo> assetInfos = assets.stream()
            .map(this::getAssetInfo)
            .toList();

        AssetResultDto assetSearchResultDto = AssetResultDto.builder()
            .assetNum(assetInfos.size())
            .assets(assetInfos)
            .build();


        return new ResponseWithData<>(HttpStatus.OK.value(),"자산 조회에 성공하였습니다",assetSearchResultDto);
    }

    @PostMapping("/send-mail")
    public ResponseEntity<?> sendMail(){
        EmailMessage emailMessage = EmailMessage.builder()
            .to("yongsu0201@gmail.com")
            .subject("안녕하세요 조용수님. 카카오 모빌리티 코딩테스트 일정 정보입니다")
            .message("구라임 ㅋㅋ")
            .build();

        emailService.sendMail(emailMessage);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private AssetInfo getAssetInfo(Asset asset) {
        List<AssetHistory> recentAssetHistoryList = assetHistoryRepository.findRecentTwoAssetHistory(asset);
        if (recentAssetHistoryList.size() < 2) throw new MutualRiskException(ErrorCode.ASSET_HISTORY_NOT_FOUND);

        // Todo: recentDate와 now 비교 로직 추가
        //        LocalDate now = LocalDate.now();
        //        LocalDate recentDate = LocalDate.from(recentAssetHistoryList.getDate());

        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        return AssetInfo.of(asset, recentAssetHistoryList, recentExchangeRate);
    }
}
