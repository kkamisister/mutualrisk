package com.example.mutualrisk.common.oauth.service;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.example.mutualrisk.common.oauth.util.OauthProvider;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoLoginParam implements OauthLoginParams {

	private String authorizationCode;

	@Override
	public OauthProvider oAuthProvider() {
		return OauthProvider.KAKAO;
	}

	@Override
	public MultiValueMap<String, String> makeBody() {
		MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
		body.add("code",authorizationCode);
		return body;
	}
}
