package com.example.mutualrisk.fund.service;

import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;
import com.example.mutualrisk.fund.dto.FundResponse.FundResultDto;

public interface FundService {

	ResponseWithData<FundResultDto> getAllFunds();

}
