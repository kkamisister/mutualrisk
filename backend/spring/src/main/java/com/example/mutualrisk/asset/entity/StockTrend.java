package com.example.mutualrisk.asset.entity;

import java.time.LocalDateTime;

import com.example.mutualrisk.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "krx_stock_trend")
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class StockTrend extends BaseEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "code")
	private String code;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "asset_id")
	private Asset asset;

	@Column(name = "date")
	private LocalDateTime date;
	@Column(name = "foreigner_hold_ratio")
	private Double ForeignerHoldRatio;
	@Column(name = "organ_pure_buy_quant")
	private Integer OrganPureBuy;
	@Column(name = "foreigner_pure_buy_quant")
	private Integer ForeignerPureBuy;
	@Column(name = "individual_pure_buy_quant")
	private Integer IndividualPureBuy;
	@Column(name = "accumulated_trading_volume")
	private Integer accumulatedTradingVolume;
}
