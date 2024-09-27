package com.example.mutualrisk.portfolio.repository;

import com.example.mutualrisk.portfolio.entity.Portfolio;
import org.springframework.stereotype.Repository;

public interface PortfolioRepository {
    Portfolio getMyPortfolio(Integer userId);
}
