package com.example.mutualrisk.common.repository;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.querydsl.SimpleEntityPathResolver;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.function.Function;


/**
 * querydsl을 보다 편하게 쓰기 위한 util class
 * 기존 querydslRepositorySupport 클래스는, 문법을 적을 때 from부터 시작해야 함 -> 직관적이지 않음
 * 이 클래스를 대신 상속해서 쿼리를 일반 sql 문처럼 select부터 사용할 수 있다
 * 그 외에도 pageable을 쉽게 처리 가능
 */
@Repository
public abstract class Querydsl4RepositorySupport<T> {
    private final Class<T> domainClass;
    private Querydsl querydsl;
    private EntityManager entityManager;
    private JPAQueryFactory queryFactory;

    public Querydsl4RepositorySupport(Class<T> domainClass) {
        Assert.notNull(domainClass, "Domain class must not be null!");
        this.domainClass = domainClass;
    }

    @Autowired
    public void setEntityManager(EntityManager entityManager) {
        Assert.notNull(entityManager, "EntityManager must not be null!");
        JpaEntityInformation<T, ?> entityInformation =
                JpaEntityInformationSupport.getEntityInformation(domainClass, entityManager);
        SimpleEntityPathResolver resolver = SimpleEntityPathResolver.INSTANCE;
        EntityPath<T> path = resolver.createPath(entityInformation.getJavaType());
        this.entityManager = entityManager;
        this.querydsl = new Querydsl(entityManager, new
                PathBuilder<>(path.getType(), path.getMetadata()));
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @PostConstruct
    public void validate() {
        Assert.notNull(entityManager, "EntityManager must not be null!");
        Assert.notNull(querydsl, "Querydsl must not be null!");
        Assert.notNull(queryFactory, "QueryFactory must not be null!");
    }

    protected JPAQueryFactory getQueryFactory() {
        return queryFactory;
    }
    protected Querydsl getQuerydsl() {
        return querydsl;
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

    protected <R> Page<R> applyPagination(Pageable pageable,
                                          Function<JPAQueryFactory, JPAQuery<R>> contentQuery) {
        JPAQuery<R> jpaQuery = contentQuery.apply(getQueryFactory());
        List<R> content = getQuerydsl().applyPagination(pageable,
                jpaQuery).fetch();
        return PageableExecutionUtils.getPage(content, pageable,
                jpaQuery::fetchCount);
    }
    protected <R> Page<R> applyPagination(Pageable pageable,
                                          Function<JPAQueryFactory, JPAQuery<R>> contentQuery, Function<JPAQueryFactory,
            JPAQuery<R>> countQuery) {
        JPAQuery<R> jpaContentQuery = contentQuery.apply(getQueryFactory());
        List<R> content = getQuerydsl().applyPagination(pageable,
                jpaContentQuery).fetch();
        JPAQuery<R> countResult = countQuery.apply(getQueryFactory());
        return PageableExecutionUtils.getPage(content, pageable,
                countResult::fetchCount);
    }
}