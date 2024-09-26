package com.example.mutualrisk.portfolio.repository;

import com.example.mutualrisk.portfolio.entity.Portfolio;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@Primary
@RequiredArgsConstructor
public class PortfolioRepositoryImpl implements PortfolioRepository{
    private final MongoTemplate mongoTemplate;


    @Override
    public Portfolio getMyPortfolio(Integer userId) {
        // userId를 기준으로 문서 검색을 위한 쿼리 생성
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));

        // 해당 쿼리를 실행하여 Portfolio 객체 반환
        return mongoTemplate.findOne(query, Portfolio.class);
    }
}
