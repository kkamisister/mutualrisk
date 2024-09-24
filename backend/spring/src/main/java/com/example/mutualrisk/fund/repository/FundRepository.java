package com.example.mutualrisk.fund.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.mutualrisk.fund.entity.Fund;

@Repository
public interface FundRepository extends MongoRepository<Fund,String> {

	// 특정 필드를 제외하고 쿼리 실행 (asset 필드를 제외)
	// @Query(value = "{}", fields = "{'asset': 0}")
	List<Fund> findTop20ByOrderByValueOfHoldingsDesc();
}
