package com.example.mutualrisk.common.oauth.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class OauthLoginServiceTest {


	@Mock
	private AuthCodeRequestUrlProviderComposite authCodeRequestUrlProviderComposite;

	@InjectMocks
	private AuthCodeRequestUrlProvider kakaoAuthCodeRequestUrlProvider;

	@BeforeEach
	void setUp(){

	}

	// @Test
	// @DisplayName("로그인 유형에 알맞은 리다이렉트 url을 반환할 수 있다")
	// void getAuthCodeRequestUrl() {
	//
	//
	// }

}