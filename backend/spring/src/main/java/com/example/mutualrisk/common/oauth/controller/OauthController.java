package com.example.mutualrisk.common.oauth.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mutualrisk.common.oauth.dto.AuthToken;
import com.example.mutualrisk.common.oauth.service.OauthLoginService;
import com.example.mutualrisk.common.oauth.util.OauthProvider;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/oauth")
@Slf4j
public class OauthController {

	private final OauthLoginService oAuthLoginService;

	@GetMapping("/kakao")
	public void kakaoLogin(HttpServletResponse response) throws IOException {

		String redirectUrl = oAuthLoginService.getAuthCodeRequestUrl(OauthProvider.KAKAO);
		response.sendRedirect(redirectUrl);
	}

	@GetMapping("/kakao/callback")
	public ResponseEntity<AuthToken> kakaoLogin(@RequestParam String code) {
		log.warn("code = {}",code);
		AuthToken authToken = oAuthLoginService.login(OauthProvider.KAKAO, code);
		return new ResponseEntity<>(authToken, HttpStatus.OK);
	}


}
