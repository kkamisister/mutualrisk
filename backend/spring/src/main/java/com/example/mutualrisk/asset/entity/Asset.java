package com.example.mutualrisk.asset.entity;

import com.example.mutualrisk.industry.entity.Industry;

import jakarta.persistence.*;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	@JoinColumn(name = "industry_id")
	private Industry industry;
}