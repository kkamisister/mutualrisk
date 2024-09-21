package com.example.mutualrisk.portfolio.entity;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import com.example.mutualrisk.asset.entity.RecommendAsset;
import com.example.mutualrisk.common.entity.BaseEntity;
import com.example.mutualrisk.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Portfolio extends BaseEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "portfolio")
	private List<RecommendAsset> recommendAssetList;

	/**
	 * 포트폴리오를 추가한 사용자를 지정한다
	 *
	 * @param user
	 */
	public void setUser(User user){
		this.user = user;
		user.getPortfolioList().add(this);
	}

}
