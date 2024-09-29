package com.example.mutualrisk.portfolio.entity;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FictionalPerformance {
    private Double expectedReturn;
    private Double volatility;
    private Double sharpeRatio;
}
