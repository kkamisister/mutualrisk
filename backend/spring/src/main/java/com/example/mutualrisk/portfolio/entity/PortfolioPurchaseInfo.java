package com.example.mutualrisk.portfolio.entity;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class PortfolioPurchaseInfo {
    Integer purchaseQuantity;
    Double purchaseAmount;
    LocalDate purchaseDate;
}
