package com.example.mutualrisk.common.oauth.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.example.mutualrisk.common.oauth.dto.KakaoToken;
import com.example.mutualrisk.common.oauth.dto.KakaoUserInfo;
import com.example.mutualrisk.common.oauth.dto.OauthUserInfo;
import com.example.mutualrisk.common.oauth.util.OauthConstant;
import com.example.mutualrisk.common.oauth.util.OauthProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class KakaoApiClient implements OauthClient {

	@Value("${spring.oauth.kakao.auth}")
	private String authUrl;
	@Value("${spring.oauth.kakao.api}")
	private String apiUrl;
	@Value("${spring.oauth.kakao.client-id}")
	private String clientId;
	@Value("${spring.oauth.kakao.client-secret}")
	private String clientSecret;

	private final RestTemplate restTemplate;


	@Override
	public OauthProvider oAuthProvider() {
		return OauthProvider.KAKAO;
	}

	@Override
	public String requestAccessToken(OauthLoginParams params) {
		String url = authUrl + "/oauth/token";
		HttpEntity<MultiValueMap<String,String>> request = generateHttpRequest(params);
		log.warn("request : {} ",request);

		// postForObject() : POST요청을 보내고 객체로 결과를 받는다
		KakaoToken kakaoToken = restTemplate.postForObject(url,request,KakaoToken.class);
		Objects.requireNonNull(kakaoToken, () -> "토큰 받아오기에 실패했습니다");

		log.warn("accessToken : {} " ,kakaoToken);

		return kakaoToken.accessToken();
	}

	@Override
	public OauthUserInfo requestOAuthInfo(String accessToken) {

		String url = apiUrl+"/v2/user/me";

		HttpHeaders headers = new HttpHeaders();
		// application/x-www-form-urlencoded 형태로 보내기 위함
		// HTML의 form 태그에서 서버에 전송할 때 사용하는 방식
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		String requestToken = "Bearer "+accessToken;
		headers.set("Authorization",requestToken);

		// MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
		// body.add("property_keys","[\"kakao_account.email\",\"kakao_account.name\"]");

		HttpEntity<?> request = new HttpEntity<>(headers);

		KakaoUserInfo userInfo = restTemplate.postForObject(url, request, KakaoUserInfo.class);
		log.warn("받은 유저 정보 : {} ",userInfo);

		return userInfo;
	}

	private HttpEntity<MultiValueMap<String,String>> generateHttpRequest(OauthLoginParams params){
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String,String> body = params.makeBody();
		log.info("age body={}",body);
		body.add("grant_type", OauthConstant.GRANT_TYPE);
		body.add("client_id",clientId);
		body.add("client_secret",clientSecret);
		return new HttpEntity<>(body,headers);
	}
}
