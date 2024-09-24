package com.example.mutualrisk.fund.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.mutualrisk.fund.entity.Fund;

@Repository
public interface FundRepository{

	List<Fund> getAllfunds();
}
