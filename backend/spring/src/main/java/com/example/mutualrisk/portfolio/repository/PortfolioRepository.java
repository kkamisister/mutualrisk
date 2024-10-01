package com.example.mutualrisk.portfolio.repository;

import com.example.mutualrisk.portfolio.entity.Portfolio;

import java.util.ArrayList;
import java.util.List;

public interface PortfolioRepository {
    List<Portfolio> getMyPortfolioList(Integer userId);

    Portfolio getPortfolioById(String id);
}
