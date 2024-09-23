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
		List<Fund> funds = fundRepository.findTop20ByOrderByValueOfHoldingsDesc();
		// for (Fund fund : funds) {
		// 	if (fund.getAsset() != null && fund.getAsset().size() > 10) {
		// 		// asset 리스트의 상위 10개 항목만 유지
		// 		fund.setAsset(fund.getAsset().subList(0, 10));
		// 	}
		// }
		return funds;
	}
}
