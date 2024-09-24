package com.example.mutualrisk.common.service;

public interface ExchangeRatesService {
    // 가장 최신의 환율 정보를 불러온다
    Double getRecentExchangeRate();
}
