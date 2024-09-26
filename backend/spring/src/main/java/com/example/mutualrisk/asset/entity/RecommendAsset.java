package com.example.mutualrisk.asset.entity;

import com.example.mutualrisk.common.entity.BaseEntity;
import com.example.mutualrisk.portfolio.entity.Portfolio;
import com.example.mutualrisk.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendAsset extends BaseEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "sharpe_ratio_diff")
	private Double sharpeRatioDiff;

	@Column(name = "return_diff")
	private Double returnDiff;

	@Column(name = "volatility_diff")
	private Double volatilityDiff;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "portfolio_id")
//	private Portfolio portfolio;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "asset_id")
	private Asset asset;

}
