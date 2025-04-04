package com.example.mutualrisk.fund.repository;

import java.util.List;
import java.util.Optional;

import com.example.mutualrisk.fund.entity.Fund;


public interface FundRepository {

	List<Fund> getFundsByPeriod(String fundName,Integer period);

	List<Fund> getAllFunds();

	Optional<Fund> getFund(String fundId);

	Optional<Fund> getTopHoldAndBuyAmount();

	Optional<Fund> getBeforeQuarter(Fund fund);

	Optional<Fund> getBeforeQuarterTopHoldAndBuyAmount(Fund fund);

	List<Fund> getAllPeriodsByCompany(String company);

	Fund save(Fund fund);

	void delete(Fund fund);

}
