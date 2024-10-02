package com.example.mutualrisk.portfolio.repository;

import com.example.mutualrisk.portfolio.entity.Portfolio;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface PortfolioRepository {
    List<Portfolio> getMyPortfolioList(Integer userId);

    Portfolio getPortfolioById(String id);

    Optional<Portfolio> getPortfolioByIdAndVersion(Integer userId,Integer version);
}
