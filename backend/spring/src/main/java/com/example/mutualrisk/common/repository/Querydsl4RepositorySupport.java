package com.example.mutualrisk.common.repository;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Expression;
import com.querydsl.jpa.impl.JPADeleteClause;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

/**
 * Querydsl를 편하게 쓰기 위한 일종의 util class
 * Querydsl 용법을 사용하고자 하는 구현 객체의 경우, 이 클래스를 상속받아서 사용
 */

@Repository
public abstract class Querydsl4RepositorySupport {
    private EntityManager entityManager;
    private JPAQueryFactory queryFactory;

    @PostConstruct
    public void validate() {
        Assert.notNull(entityManager, "EntityManager must not be null!");
        Assert.notNull(queryFactory, "QueryFactory must not be null!");
    }

    @Autowired
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Autowired
    public void setQueryFactory(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    protected JPAQueryFactory getQueryFactory() {
        return queryFactory;
    }
    protected EntityManager getEntityManager() {
        return entityManager;
    }

    protected <R> JPAQuery<R> select(Expression<R> expr) {
        return getQueryFactory().select(expr);
    }
    protected <R> JPAQuery<R> selectFrom(EntityPath<R> from) {
        return getQueryFactory().selectFrom(from);
    }
    protected <R> JPAUpdateClause updateFrom(EntityPath<R> from) {
        return getQueryFactory().update(from);
    }
    protected <R> JPADeleteClause deleteFrom(EntityPath<R> from) {
        return getQueryFactory().delete(from);
    }
}
