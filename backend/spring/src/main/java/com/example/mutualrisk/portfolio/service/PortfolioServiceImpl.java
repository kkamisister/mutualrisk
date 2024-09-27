package com.example.mutualrisk.portfolio.service;

import com.example.mutualrisk.asset.entity.Asset;
import com.example.mutualrisk.asset.entity.AssetHistory;
import com.example.mutualrisk.asset.repository.AssetHistoryRepository;
import com.example.mutualrisk.asset.repository.AssetRepository;
import com.example.mutualrisk.common.dto.CommonResponse.*;
import com.example.mutualrisk.common.enums.Region;
import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;
import com.example.mutualrisk.portfolio.entity.Portfolio;
import com.example.mutualrisk.portfolio.entity.PortfolioAsset;
import com.example.mutualrisk.portfolio.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService{
    private final PortfolioRepository portfolioRepository;
    private final AssetRepository assetRepository;
    private final AssetHistoryRepository assetHistoryRepository;
    private final ExchangeRatesRepository exchangeRatesRepository;


    @Override
    public ResponseWithData<PortfolioResultDto> getPortfolioInfo(Integer userId) {

        // 1. userId를 이용해서, mongoDB에서 데이터를 검색해 가져온다
        Portfolio portfolio = portfolioRepository.getMyPortfolio(userId);

        // 2-1. userId에 해당하는 포트폴리오가 없을 경우
        if (portfolio == null) {
            return buildNoPortfolioResponse();
        }
        // 2-2. userId에 해당하는 포트폴리오가 존재할 경우
        List<PortfolioAsset> portfolioAssetList = portfolio.getAsset();
        List<Asset> assetList = getAssetsFromPortfolio(portfolioAssetList);
        // 자산들의 구매 금액을 저장하는 리스트
        List<Double> purchaseAmounts = calculatePurchaseAmounts(portfolioAssetList, assetList);
        // 포트폴리오에 속해 있는 자산 리스트

        double totalAmount = purchaseAmounts.stream()
            .mapToDouble(Double::doubleValue)
            .sum();

        // 3. 각 값의 비율을 계산해서 weights 리스트에 추가
        List<Double> weights = calculateWeights(purchaseAmounts, totalAmount);

        List<PortfolioAssetInfo> portfolioAssetInfoList = buildPortfolioAssetInfoList(assetList, weights, portfolioAssetList);

        PortfolioPerformance portfolioPerformance = getPortfolioPerformance(assetList, weights, totalAmount);

        return buildNoPortfolioResponse(portfolio, portfolioAssetInfoList, portfolioPerformance);
    }

    private ResponseWithData<PortfolioResultDto> buildNoPortfolioResponse(Portfolio portfolio, List<PortfolioAssetInfo> portfolioAssetInfoList, PortfolioPerformance portfolioPerformance) {
        PortfolioInfo portfolioInfo = PortfolioInfo.builder()
            .portfolioId(portfolio.getId())
            .performance(portfolioPerformance)
            .assets(portfolioAssetInfoList)
            .build();

        PortfolioResultDto portfolioResultDto = PortfolioResultDto.builder()
            .hasPortfolio(Boolean.TRUE)
            .portfolio(portfolioInfo)
            .build();

        return new ResponseWithData<>(HttpStatus.OK.value(), "정상적인 응답을 반환하였습니다", portfolioResultDto);
    }

    private static List<PortfolioAssetInfo> buildPortfolioAssetInfoList(List<Asset> assetList, List<Double> weights, List<PortfolioAsset> portfolioAssetList) {

        return IntStream.range(0, assetList.size())
            .mapToObj(i -> PortfolioAssetInfo.of(portfolioAssetList.get(i), assetList.get(i), weights.get(i)))
            .toList();
    }

    private static List<Double> calculateWeights(List<Double> purchaseAmounts, double totalAmount) {
        return purchaseAmounts.stream()
            .map(amount -> amount / totalAmount)
            .toList();
    }

    private List<Double> calculatePurchaseAmounts(List<PortfolioAsset> portfolioAssetList, List<Asset> assetList) {
        Double recentExchangeRate = exchangeRatesRepository.getRecentExchangeRate();

        return IntStream.range(0, portfolioAssetList.size())
            .mapToObj(i -> {
                PortfolioAsset portfolioAsset = portfolioAssetList.get(i);
                Asset asset = assetList.get(i);
                double price = portfolioAsset.getPurchaseQuantity() * asset.getRecentPrice();
                if (asset.getRegion().equals(Region.US)) {
                    price *= recentExchangeRate;
                }
                return price;
            })
            .collect(Collectors.toList());
    }

    private List<Asset> getAssetsFromPortfolio(List<PortfolioAsset> portfolioAssetList) {
        return portfolioAssetList.stream()
            .map(portfolioAsset -> assetRepository.findById(portfolioAsset.getAssetId())
                .orElseThrow(() -> new MutualRiskException(ErrorCode.ASSET_NOT_FOUND)))
            .collect(Collectors.toList());
    }

    // 포트폴리오가 없을 경우 응답을 생성하는 메서드
    private ResponseWithData<PortfolioResultDto> buildNoPortfolioResponse() {
        PortfolioResultDto portfolioResultDto = PortfolioResultDto.builder()
            .hasPortfolio(Boolean.FALSE)
            .build();
        return new ResponseWithData<>(HttpStatus.OK.value(), "유저가 포트폴리오를 아직 만들지 않은 상태입니다", portfolioResultDto);
    }

    private PortfolioPerformance getPortfolioPerformance(List<Asset> assetList, List<Double> weights, double totalAmount) {
        // todo: expected_return, covariance_matrix가 데이터 적재가 덜 되어서 구하는 로직을 추가하지 않음. 추후 추가 필요

        return PortfolioPerformance.builder()
            .valuation(totalAmount)
            .build();
    }
}
