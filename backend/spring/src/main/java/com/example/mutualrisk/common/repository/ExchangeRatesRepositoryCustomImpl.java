package com.example.mutualrisk.common.repository;

import static com.example.mutualrisk.common.entity.QExchangeRates.*;

public class ExchangeRatesRepositoryCustomImpl extends Querydsl4RepositorySupport implements ExchangeRatesRepositoryCustom {

    // 가장 최신의 환율 정보를 불러온다
    @Override
    public Double getRecentExchangeRate() {
        return select(exchangeRates.dbr)
            .from(exchangeRates)
            .where(exchangeRates.curUnit.eq("USD"))
            .orderBy(exchangeRates.exRateDate.desc())
            .fetchOne();
    }
}
