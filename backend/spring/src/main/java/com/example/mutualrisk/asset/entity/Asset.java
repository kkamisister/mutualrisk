package com.example.mutualrisk.asset.entity;

import com.example.mutualrisk.industry.entity.Industry;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Asset {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "name" ,nullable = false)
	private String name;

	@Column(name = "code" ,nullable = false)
	private String code;

	@Enumerated(EnumType.STRING)
	private Region region;

	@Column(name = "expected_return" ,nullable = false)
	private int expectedReturn;

	@ManyToOne(fetch = FetchType.LAZY)
	private Industry industry;

}