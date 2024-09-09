package com.example.mutualrisk.common.oauth.util;

import static java.util.Locale.*;

public enum OauthProvider {
	KAKAO,NAVER;

	// kakao 라는 경로로 들어오면 KAKAO enum을 찾기위한 메서드
	public static OauthProvider fromName(String type){
		return OauthProvider.valueOf(type.toUpperCase(ENGLISH));
	}
}
