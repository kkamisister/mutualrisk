package com.example.mutualrisk.fund.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.mutualrisk.fund.entity.FundReturns;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class FundReturnsRepositoryImpl implements FundReturnsRepository {

	private final MongoTemplate mongoTemplate;

	@Override
	public FundReturns save(FundReturns fundReturns) {
		return mongoTemplate.save(fundReturns);
	}

	@Override
	public List<FundReturns> findByCompanyAndPeriod(String company, Integer period) {

		// 현재 날짜로부터 period 기간 전의 날짜를 계산
		LocalDate today = LocalDate.now();
		LocalDate startDate = today.minusYears(period); // period 기간 전의 날짜 계산

		Query query = new Query();
		query.addCriteria(Criteria.where("company").is(company));

		//(period전~오늘) 까지의 데이터만 가져오기
		query.addCriteria(Criteria.where("submissionDate").lt(today).gte(startDate)); // period 기간 전의 데이터
		// 날짜의 오름차순으로 정렬
		query.with(Sort.by(Sort.Order.asc("submissionDate")));

		return mongoTemplate.find(query,FundReturns.class);
	}
}
