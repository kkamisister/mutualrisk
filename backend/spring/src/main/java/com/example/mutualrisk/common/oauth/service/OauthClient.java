package com.example.mutualrisk.common.oauth.service;

import com.example.mutualrisk.common.oauth.dto.OauthUserInfo;
import com.example.mutualrisk.common.oauth.util.OauthProvider;

public interface OauthClient {

	OauthProvider oAuthProvider();

	String requestAccessToken(OauthLoginParams params);

	OauthUserInfo requestOAuthInfo(String accessToken);
}
