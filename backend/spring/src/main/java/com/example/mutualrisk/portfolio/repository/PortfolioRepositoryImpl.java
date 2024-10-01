package com.example.mutualrisk.portfolio.repository;

import com.example.mutualrisk.portfolio.entity.Portfolio;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@Primary
@RequiredArgsConstructor
public class PortfolioRepositoryImpl implements PortfolioRepository{
    private final MongoTemplate mongoTemplate;

    @Override
    public List<Portfolio> getMyPortfolioList(Integer userId) {

        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.match(Criteria.where("userId").is(userId)),
            Aggregation.sort(Sort.Direction.DESC, "version")
        );

        // userId를 기준으로 문서 검색을 위한 쿼리 생성
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));

        // Aggregation 실행
        AggregationResults<Portfolio> results = mongoTemplate.aggregate(aggregation, "portfolio", Portfolio.class);
        return results.getMappedResults();
    }

    @Override
    public Portfolio getPortfolioById(String id) {
        // userId를 기준으로 문서 검색을 위한 쿼리 생성
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));

        // 해당 쿼리를 실행하여 Portfolio 객체 반환
        return mongoTemplate.findOne(query, Portfolio.class);
    }


}
