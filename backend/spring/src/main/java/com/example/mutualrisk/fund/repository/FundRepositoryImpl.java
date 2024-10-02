package com.example.mutualrisk.fund.repository;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
	public List<Fund> getFundsByPeriod(String fundName,Integer period) {

		// 현재 날짜로부터 period 기간 전의 날짜를 계산
		LocalDate today = LocalDate.now();
		LocalDate startDate = today.minusYears(period); // period 기간 전의 날짜 계산

		Query query = new Query();

		// 입력받은 펀드 찾기
		query.addCriteria(Criteria.where("company").is(fundName));

		// // (period전~오늘) 까지의 데이터만 가져오기
		query.addCriteria(Criteria.where("submissionDate").lt(today).gte(startDate)); // period 기간 전의 데이터
		//
		// 날짜의 오름차순으로 정렬
		query.with(Sort.by(Sort.Order.asc("submissionDate")));

		// asset 필드는 제외
		query.fields().exclude("asset");

		// 쿼리 실행
		return mongoTemplate.find(query, Fund.class);
	}

	@Override
	public List<Fund> getAllFunds() {

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
	public Optional<Fund> getBeforeQuarterTopHoldAndBuyAmount(Fund fund) {

		Query query = new Query();

		// type : totalFund인 것을 찾는다
		query.addCriteria(Criteria.where("type").is(fund.getType()));

		// 제출일이 바로 이전인 것을 찾는다
		query.addCriteria(Criteria.where("submissionDate").lt(fund.getSubmissionDate()));

		// submissionDate로 내림차순 정렬
		query.with(Sort.by(Sort.Order.desc("submissionDate")));

		// 현재 asset은 필요없기때문에, 가져오지않는다
		query.fields().exclude("asset");

		return Optional.ofNullable(mongoTemplate.findOne(query,Fund.class));
	}

	@Override
	public Fund save(Fund fund) {
		return mongoTemplate.save(fund);
	}

}
