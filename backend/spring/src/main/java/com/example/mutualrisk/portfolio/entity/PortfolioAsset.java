package com.example.mutualrisk.portfolio.entity;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class PortfolioAsset {
    private Integer assetId;
    private String code;
    private String name;
    private Integer purchaseQuantity;
    private LocalDate purchaseDate;
}
