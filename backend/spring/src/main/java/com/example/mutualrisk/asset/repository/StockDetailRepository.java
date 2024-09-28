package com.example.mutualrisk.asset.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mutualrisk.asset.entity.StockDetail;

public interface StockDetailRepository extends JpaRepository<StockDetail, Integer>,StockDetailCustom {


}
