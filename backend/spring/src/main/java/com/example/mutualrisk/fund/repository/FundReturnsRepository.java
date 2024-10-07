package com.example.mutualrisk.fund.repository;

import java.util.List;

import com.example.mutualrisk.fund.entity.FundReturns;

public interface FundReturnsRepository {

	FundReturns save(FundReturns fundReturns);

	List<FundReturns> findByCompanyAndPeriod(String company,Integer period);
}
