package com.example.mutualrisk.common.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Table(name = "exchange_rates")
public class ExchangeRates extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 통화 단위 (USD, EUR 등)
    @Column(name = "cur_unit")
    private String curUnit;

    // Telegraphic Transfer Buying rate(매입 환율)
    private Double ttb;

    // Telegraphic Transfer Selling rate(매도 환율)
    private Double tts;

    // Deal Base Rate(기준 환율)
    private Double dbr;

    // Book Price(장부 가격)
    private Double bkpr;

    // Yearly Fee Rate(연계 수수료율)
    private Double yyEfeeR;

    // Ten-day Fee Rate(10일 수수료율)
    private Double tenDdEfeeR;

    // Korea Financial Telecommunications and Clearings Institute Book Price(KFTC 장부가격)
    private Double kftcBkpr;

    // KFTC 기준환율
    private Double kftcDealBasR;

    // Currency Name: 통화명
    private String curNm;

    // 기준 날짜
    private LocalDate exRateDate;
}
