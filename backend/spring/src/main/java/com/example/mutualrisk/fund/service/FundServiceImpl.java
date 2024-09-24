package com.example.mutualrisk.fund.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mutualrisk.fund.entity.Fund;
import com.example.mutualrisk.fund.repository.FundRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FundServiceImpl implements FundService {

	private final FundRepository fundRepository;

	@Override
	public List<Fund> getTop20Funds() {
		List<Fund> funds = fundRepository.getTop20();
		return funds;
	}
}
