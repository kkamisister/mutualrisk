package com.example.mutualrisk.fund.service;

import static com.example.mutualrisk.fund.dto.FundResponse.*;

import java.util.List;

import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.fund.dto.FundResponse.FundResultDto;

public interface FundService {

	ResponseWithData<FundSummaryResultDto> getAllFunds();

	ResponseWithData<FundResultDto> getFund(Integer userId,String fundId);

	ResponseWithData<List<PortfolioReturnDto>> getHistory(Integer userId, String company, Integer period);


}
