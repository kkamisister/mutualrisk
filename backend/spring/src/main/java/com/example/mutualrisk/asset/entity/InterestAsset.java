package com.example.mutualrisk.asset.entity;

import org.apache.logging.log4j.util.Lazy;

import com.example.mutualrisk.common.entity.BaseEntity;
import com.example.mutualrisk.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class InterestAsset extends BaseEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "asset_id")
	private Asset asset;

	/**
	 * 관심목록을 추가한 사용자를 지정한다
	 *
	 * @param user
	 */
	public void setUser(User user){
		this.user = user;
		user.getInterestAssetList().add(this);
	}

	public static InterestAsset of(User user,Asset asset){
		return InterestAsset.builder()
			.user(user)
			.asset(asset)
			.build();

	}

}
