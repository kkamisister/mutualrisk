package com.example.mutualrisk.common.oauth.service;

import com.example.mutualrisk.common.oauth.util.OauthProvider;

/**
 * AuthCode를 발급하기위한 url을 제공하는 기능 제공
 */
public interface AuthCodeRequestUrlProvider {

	OauthProvider supportServer();

	String provide();
}
