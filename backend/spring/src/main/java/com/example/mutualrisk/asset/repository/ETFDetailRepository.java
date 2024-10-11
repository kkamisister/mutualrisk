package com.example.mutualrisk.asset.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mutualrisk.asset.entity.ETFDetail;

public interface ETFDetailRepository extends JpaRepository<ETFDetail, Integer>, ETFDetailRepositoryCustom {

}
