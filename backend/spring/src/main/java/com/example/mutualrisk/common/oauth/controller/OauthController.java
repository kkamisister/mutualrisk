package com.example.mutualrisk.common.oauth.controller;

import static com.example.mutualrisk.common.dto.CommonResponse.*;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.oauth.dto.AuthToken;
import com.example.mutualrisk.common.oauth.service.OauthLoginService;
import com.example.mutualrisk.common.oauth.util.OauthProvider;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/oauth")
@Slf4j
@Tag(name = "사용자 인증 API",description = "카카오 로그인을 수행하기위한 Controller입니다")
public class OauthController {

	private final OauthLoginService oAuthLoginService;

	@Operation(summary = "카카오 로그인", description = "카카오 로그인으로 리다이렉트하는 api")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "304", description = "로그인 창 리다이렉트"),
	})
	@GetMapping("/kakao")
	public void kakaoLogin(HttpServletResponse response) throws IOException {

		String redirectUrl = oAuthLoginService.getAuthCodeRequestUrl(OauthProvider.KAKAO);
		response.sendRedirect(redirectUrl);
	}

	@Operation(summary = "로그인 코드", description = "로그인 코드를 받아 로그인을 하는 api")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "로그인 완료"),
	})
	@GetMapping("/kakao/callback")
	public ResponseEntity<AuthToken> kakaoLogin(@RequestParam("code") String code) {
		// log.warn("code = {}",code);
		AuthToken authToken = oAuthLoginService.login(OauthProvider.KAKAO, code);
		return new ResponseEntity<>(authToken, HttpStatus.OK);
	}

	@Operation(summary = "로그아웃 ", description = "로그아웃을 하는 api")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "로그아웃"),
	})
	@GetMapping("/kakao/logout")
	public ResponseEntity<?> kakaoLogout(HttpServletRequest request){

		String authorization = request.getHeader("Authorization");
		// log.warn("userId = {}",authorization);

		ResponseWithMessage resultMessage = oAuthLoginService.logout(authorization);

		return new ResponseEntity<>(resultMessage,HttpStatus.OK);
	}




}
