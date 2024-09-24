package com.example.mutualrisk.common.repository;

//import static com.example.mutualrisk.asset.entity.QExchangeRates.*;

public class ExchangeRatesRepositoryCustomImpl extends Querydsl4RepositorySupport implements ExchangeRatesRepositoryCustom {
    @Override
    public Double getRecentExchangeRate() {
        return 0.0;
    }
}
