package com.example.mutualrisk.fund.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.mutualrisk.fund.entity.Fund;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class FundRepositoryImpl implements FundRepository {

	private final MongoTemplate mongoTemplate;

	@Override
	public List<Fund> getTop20() {

		Query query = new Query();

		// 날짜 순 내림차순, valueOfHoldings 내림차순으로 정렬
		query.with(Sort.by(Sort.Order.desc("submissionDate"), Sort.Order.desc("valueOfHoldings")));

		// 상위 20개만 가져오기 위한 limit 설정
		query.limit(20);

		// 쿼리 실행
		return mongoTemplate.find(query, Fund.class);
	}
}
