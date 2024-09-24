package com.example.mutualrisk.common.repository;

import static com.example.mutualrisk.common.entity.QExchangeRates.*;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ExchangeRatesRepositoryCustomImpl extends Querydsl4RepositorySupport implements ExchangeRatesRepositoryCustom {

    // 가장 최신의 환율 정보를 불러온다
    @Override
    public Double getRecentExchangeRate() {
        return select(exchangeRates.dbr)
            .from(exchangeRates)
            .where(exchangeRates.curUnit.eq("USD"))
            .orderBy(exchangeRates.exRateDate.desc())
            .limit(1)
            .fetchOne();
    }
}
