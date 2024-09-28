package com.example.mutualrisk.test.controller;

import static com.example.mutualrisk.asset.dto.AssetResponse.*;
import static com.example.mutualrisk.fund.dto.FundResponse.*;

import java.util.Arrays;
import java.util.List;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.asset.repository.StockTrendRepository;
import com.example.mutualrisk.asset.service.AssetService;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.common.email.dto.EmailMessage;
import com.example.mutualrisk.common.email.service.EmailService;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.fund.service.FundService;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 테스트용 컨트롤러
 * jwt 로직에서 제외시킴(검증 로직 x)
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/test")
@Slf4j
@Hidden
public class TestController {

    private final FundService fundService;
    private final AssetRepository assetRepository;
    private final AssetHistoryRepository assetHistoryRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;
    private final AssetService assetService;
    private final EmailService emailService;

    @GetMapping("/stock-detail")
    public ResponseEntity<ResponseWithData<StockTrendWithDetail>> stockDetail(@RequestParam("assetId") Integer assetId) {

        ResponseWithData<StockTrendWithDetail> stockTrendWithDetail = assetService.getStockTrendWithDetail(assetId);

        log.warn("주식 세부사항 : {}",stockTrendWithDetail);
        return ResponseEntity.status(stockTrendWithDetail.status())
            .body(stockTrendWithDetail);
    }
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
            .to("hayeonful@gmail.com")
            .subject("안녕하세요 김하연님. 바나프레소 코딩테스트 일정 정보입니다")
            .message("--------------------------------------------------------------------------------"
                + ""
                + "------------------------------"
                + ""
                + "-----------------------------\n"
                + "더블쿼터파운드 치즈버거세트 9100원")
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
