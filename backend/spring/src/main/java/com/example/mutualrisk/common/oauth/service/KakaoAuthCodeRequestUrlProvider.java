package com.example.mutualrisk.common.oauth.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.mutualrisk.common.oauth.config.KakaoOauthConfig;
import com.example.mutualrisk.common.oauth.util.OauthProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class KakaoAuthCodeRequestUrlProvider implements AuthCodeRequestUrlProvider {

	private final KakaoOauthConfig kakaoOauthConfig;

	@Value("${spring.oauth.kakao.auth}")
	private String authUrl;

	@Override
	public OauthProvider supportServer() {
		return OauthProvider.KAKAO;
	}

	@Override
	public String provide() {
		return UriComponentsBuilder
			.fromUriString(authUrl+ "/oauth/authorize")
			.queryParam("response_type","code")
			.queryParam("client_id",kakaoOauthConfig.clientId())
			.queryParam("redirect_uri",kakaoOauthConfig.redirectUri())
			.queryParam("scope",String.join(",", kakaoOauthConfig.scope()))
			.toUriString();
	}
}
