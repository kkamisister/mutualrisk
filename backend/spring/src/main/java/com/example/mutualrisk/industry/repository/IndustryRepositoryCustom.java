package com.example.mutualrisk.industry.repository;

import com.example.mutualrisk.industry.entity.Industry;

public interface IndustryRepositoryCustom {
    Industry findIndustryByName(String name);
}
