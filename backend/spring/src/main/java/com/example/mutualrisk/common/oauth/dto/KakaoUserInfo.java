package com.example.mutualrisk.common.oauth.dto;

import com.example.mutualrisk.common.oauth.util.OauthProvider;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.ToString;

@Getter
public class KakaoUserInfo implements OauthUserInfo {

	private Long id;

	@JsonProperty("kakao_account")
	private KakaoAccount kakaoAccount;

	@Override
	public Long getId(){
		return id;
	}

	@Override
	public String getEmail() {
		return kakaoAccount.email();
	}

	@Override
	public String getImage() {
		return kakaoAccount.profile().profileImageUrl();
	}

	@Override
	public String getNickName() {
		return kakaoAccount.profile().nickname();
	}

	@Override
	public OauthProvider getOAuthProvider() {
		return OauthProvider.KAKAO;
	}

}
