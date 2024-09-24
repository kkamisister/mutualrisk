package com.example.mutualrisk.fund.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.mutualrisk.fund.entity.Fund;

@Repository
public interface FundRepository{

	List<Fund> getTop20();
}
