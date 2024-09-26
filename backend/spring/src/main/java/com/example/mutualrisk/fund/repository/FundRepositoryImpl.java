package com.example.mutualrisk.fund.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.mutualrisk.fund.entity.Fund;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@Primary
@RequiredArgsConstructor
@Slf4j
public class FundRepositoryImpl implements FundRepository {

	private final MongoTemplate mongoTemplate;

	@Override
	public List<Fund> getAllfunds() {

		Query query = new Query();

		// 날짜 순 내림차순, valueOfHoldings 내림차순으로 정렬
		query.with(Sort.by(Sort.Order.desc("submissionDate"), Sort.Order.desc("valueOfHoldings")));

		// 상위 20개만 가져오기 위한 limit 설정
		query.limit(20);

		query.fields().exclude("asset");

		// 쿼리 실행
		return mongoTemplate.find(query, Fund.class);
	}


	@Override
	public Optional<Fund> getFund(String fundId) {
		Query query = new Query();

		// id로 펀드를 찾는다
		query.addCriteria(Criteria.where("id").is(fundId));

		return Optional.ofNullable(mongoTemplate.findOne(query,Fund.class));
	}

	@Override
	public Optional<Fund> getTopHoldAndBuyAmount() {

		Query query = new Query();

		// totalFund라는 타입을 찾는다
		query.addCriteria(Criteria.where("type").is("totalFund"));
		// submissionDate로 내림차순 정렬
		query.with(Sort.by(Sort.Order.desc("submissionDate")));

		// 현재 asset은 필요없기때문에, 가져오지않는다
		query.fields().exclude("asset");

		return Optional.ofNullable(mongoTemplate.findOne(query,Fund.class));
	}

	@Override
	public Optional<Fund> getBeforeQuarter(Fund fund) {

		Query query = new Query();

		// 회사명이 동일한 펀드를 찾는다
		query.addCriteria(Criteria.where("company").is(fund.getCompany()));

		// submissionDate가 현재 펀드의 submissionDate보다 이전인 것을 찾는다
		query.addCriteria(Criteria.where("submissionDate").lt(fund.getSubmissionDate()));

		// submissionDate로 내림차순 정렬
		query.with(Sort.by(Sort.Order.desc("submissionDate")));

		return Optional.ofNullable(mongoTemplate.findOne(query,Fund.class));
	}

	@Override
	public Fund save(Fund fund) {
		return mongoTemplate.save(fund);
	}

}
