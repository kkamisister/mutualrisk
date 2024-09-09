package com.example.mutualrisk.common.oauth.dto;

import com.example.mutualrisk.common.oauth.util.OauthProvider;

public interface OauthUserInfo {
	Long getId();
	String getEmail();
	String getImage();
	String getNickName();
	OauthProvider getOAuthProvider();
}
