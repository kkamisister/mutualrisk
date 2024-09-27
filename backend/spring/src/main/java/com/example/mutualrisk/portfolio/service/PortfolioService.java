package com.example.mutualrisk.portfolio.service;

import com.example.mutualrisk.common.dto.CommonResponse.*;
import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;


public interface PortfolioService {
    ResponseWithData<PortfolioResultDto> getPortfolioInfo(Integer userId);
    ResponseWithMessage sendRefreshMail();
}
