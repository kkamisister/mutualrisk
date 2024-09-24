package com.example.mutualrisk.common.service;

import com.example.mutualrisk.common.repository.ExchangeRatesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExchangeRatesServiceImpl implements ExchangeRatesService{

    private final ExchangeRatesRepository exchangeRatesRepository;

    @Override
    public Double getRecentExchangeRate() {
        return exchangeRatesRepository.getRecentExchangeRate();
    }
}
