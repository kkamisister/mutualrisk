package com.example.mutualrisk.user.entity;

import java.util.ArrayList;
import java.util.List;

import com.example.mutualrisk.asset.entity.InterestAsset;
import com.example.mutualrisk.common.entity.BaseEntity;
import com.example.mutualrisk.portfolio.entity.Portfolio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class User extends BaseEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "email",nullable = false)
	private String email;

	@Column(name = "nickname")
	private String nickname;

	@Column(name = "oauth_id",nullable = false)
	private String oauthId;

	@Column(name = "image")
	private String image;

	@OneToMany(mappedBy = "user")
	@Builder.Default
	private List<InterestAsset> interestAssetList = new ArrayList<>();

//	@OneToMany(mappedBy = "user")
//	@Builder.Default
//	private List<Portfolio> portfolioList = new ArrayList<>();

}
