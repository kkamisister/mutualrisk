package com.example.mutualrisk.portfolio.entity;

import java.util.List;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FrontierPoint {
	private Double expectedReturn;
	private Double volatility;
	private List<Double> weights;
}
