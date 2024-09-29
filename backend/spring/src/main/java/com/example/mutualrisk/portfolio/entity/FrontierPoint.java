package com.example.mutualrisk.portfolio.entity;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FrontierPoint {
	private Double expectedReturn;
	private Double volatility;
	private List<Double> weights;
}
