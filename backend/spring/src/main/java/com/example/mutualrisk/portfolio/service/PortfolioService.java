package com.example.mutualrisk.portfolio.service;

import java.util.List;

import com.example.mutualrisk.common.dto.CommonResponse.*;
import com.example.mutualrisk.common.enums.PerformanceMeasure;
import com.example.mutualrisk.common.enums.TimeInterval;
import com.example.mutualrisk.fund.dto.FundResponse.*;
import com.example.mutualrisk.portfolio.dto.PortfolioRequest;
import com.example.mutualrisk.portfolio.dto.PortfolioRequest.PortfolioInitDto;
import com.example.mutualrisk.portfolio.dto.PortfolioRequest.RecommendAssetRequestDto;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;


public interface PortfolioService {
    ResponseWithData<PortfolioResultDto> getPortfolioInfo(Integer userId, String portfolioId);
    ResponseWithMessage sendRefreshMail();

    ResponseWithData<PortfolioValuationDto> getUserPortfolioPerformance(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId);

    ResponseWithData<List<SectorInfo>> getUserPortfolioSector(Integer userId, String portfolioId);

    ResponseWithData<FrontierDto> getFrontierPoints(Integer userId, String portfolioId);

    ResponseWithData<PortfolioValuationDto> getHistoricalValuation(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId);

    ResponseWithData<List<PortfolioReturnDto>> getHistoricalReturns(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId);

    ResponseWithData<PortfolioTotalSearchDto> getAllUserPortfolio(Integer userId);

    ResponseWithData<List<PortfolioAssetInfo>> getAssetInfoList(Integer userId, String portfolioId);

    ResponseWithData<CalculatedPortfolio> initPortfolio(Integer userId, PortfolioInitDto initInfo);

    ResponseWithData<PortfolioStatusSummary> userPortfolioSummary(Integer userId,Integer version);

    ResponseWithData<String> confirmPortfolio(Integer userId, PortfolioInitDto initInfo);

    ResponseWithData<PortfolioBackTestDto> getBackTestOfCreatedPortfolio(Integer userId, List<RecommendAssetInfo> recommendAssetInfoList, TimeInterval timeInterval, PerformanceMeasure measure);

    ResponseWithData<PortfolioAnalysis> getRecommendedAssets(RecommendAssetRequestDto recommendAssetRequestDto);
}
