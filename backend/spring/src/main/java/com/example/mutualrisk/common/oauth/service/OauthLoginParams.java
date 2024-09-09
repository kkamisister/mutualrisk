package com.example.mutualrisk.common.oauth.service;

import org.springframework.util.MultiValueMap;

import com.example.mutualrisk.common.oauth.util.OauthProvider;

public interface OauthLoginParams {

	OauthProvider oAuthProvider();
	MultiValueMap<String,String> makeBody();
}
