package com.example.mutualrisk.fund.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.mutualrisk.fund.entity.Fund;


public interface FundRepository {

	List<Fund> getAllfunds();

	Optional<Fund> getFund(String fundId);

	Optional<Fund> getTopHoldAndBuyAmount();

	Optional<Fund> getBeforeQuarter(Fund fund);

	Fund save(Fund fund);

}
