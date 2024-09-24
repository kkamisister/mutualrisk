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
    @Column(name = "ttb")
    private Double ttb;

    // Telegraphic Transfer Selling rate(매도 환율)
    @Column(name = "tts")
    private Double tts;

    // Deal Base Rate(기준 환율)
    @Column(name = "deal_bas_r")
    private Double dbr;

    // Book Price(장부 가격)
    @Column(name = "bkpr")
    private Double bkpr;

    // Yearly Fee Rate(연계 수수료율)
    @Column(name = "yy_efee_r")
    private Double yyEfeeR;

    // Ten-day Fee Rate(10일 수수료율)
    @Column(name = "ten_ddefee_r")
    private Double tenDdEfeeR;

    // Korea Financial Telecommunications and Clearings Institute Book Price(KFTC 장부가격)
    @Column(name = "kftc_bkpr")
    private Double kftcBkpr;

    // KFTC 기준환율
    @Column(name = "kftc_deal_bas_r")
    private Double kftcDealBasR;

    // Currency Name: 통화명
    @Column(name = "cur_nm")
    private String curNm;

    // 기준 날짜
    @Column(name = "ex_rate_date")
    private LocalDate exRateDate;
}
