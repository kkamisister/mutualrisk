package com.example.mutualrisk.common.repository;
import com.example.mutualrisk.common.entity.ExchangeRates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExchangeRatesRepository extends JpaRepository<ExchangeRates, Integer>, ExchangeRatesRepositoryCustom {

}
