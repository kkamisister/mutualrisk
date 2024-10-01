package com.example.mutualrisk.portfolio.service;

import java.util.List;

import com.example.mutualrisk.common.dto.CommonResponse.*;
import com.example.mutualrisk.common.enums.PerformanceMeasure;
import com.example.mutualrisk.common.enums.TimeInterval;
import com.example.mutualrisk.fund.dto.FundResponse.*;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;


public interface PortfolioService {
    ResponseWithData<PortfolioResultDto> getPortfolioInfo(Integer userId, String portfolioId);
    ResponseWithMessage sendRefreshMail();

    ResponseWithData<PortfolioValuationDto> getUserPortfolioPerformance(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId);

    ResponseWithData<List<SectorInfo>> getUserPortfolioSector(Integer userId, String portfolioId);

    ResponseWithData<FrontierDto> getFrontierPoints(Integer userId, String portfolioId);

    ResponseWithData<PortfolioValuationDto> getHistoricalValuation(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId);

    ResponseWithData<List<PortfolioReturnDto>> getHistoricalReturns(TimeInterval timeInterval, PerformanceMeasure measure, Integer userId, String portfolioId);

    ResponseWithData<List<SimplePortfolioDto>> getAllUserPortfolio(Integer userId);
}
