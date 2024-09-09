package com.example.mutualrisk.industry.repository;

import com.example.mutualrisk.industry.entity.Industry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndustryRepository extends JpaRepository<Industry, Integer>, IndustryRepositoryCustom {
    Industry findById(int id);
}
