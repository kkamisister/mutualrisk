package com.example.mutualrisk.industry.repository;

import com.example.mutualrisk.common.repository.Querydsl4RepositorySupport;
import com.example.mutualrisk.industry.entity.Industry;
import com.querydsl.core.support.QueryBase;
import com.querydsl.jpa.impl.JPAQuery;

import java.lang.reflect.Member;

import static com.example.mutualrisk.industry.entity.QIndustry.industry;

public class IndustryRepositoryCustomImpl extends Querydsl4RepositorySupport implements IndustryRepositoryCustom{

    @Override
    public Industry findIndustryByName(String name) {
        return select(industry)
                .from(industry)
                .where(industry.name.eq(name))
                .fetchOne();
    }
}
