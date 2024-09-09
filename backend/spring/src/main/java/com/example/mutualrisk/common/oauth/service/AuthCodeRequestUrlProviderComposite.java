package com.example.mutualrisk.common.oauth.service;

import static java.util.function.UnaryOperator.*;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.mutualrisk.common.oauth.util.OauthProvider;

@Component
public class AuthCodeRequestUrlProviderComposite {

	private final Map<OauthProvider,AuthCodeRequestUrlProvider> mapping;

	/**
	 * 	providers 안에는 AuthCodeRequestUrlProvider를 구현한 여러 구현체(kakao,naver,google)
	 * 	들이 들어가게된다.
	 *
	 * 	인증플랫폼이 여러가지일 경우, 각각에 대해 redirectUri를 생성해내기 위해 사용
	 * 	일종의 compositer 패턴(트리구조를 통해 개별 객체들을 유사하게 취급가능)
	 *
	 * @param providers
	 */
	public AuthCodeRequestUrlProviderComposite(Set<AuthCodeRequestUrlProvider> providers) {
		mapping = providers.stream()
			.collect(Collectors.toMap(
				AuthCodeRequestUrlProvider::supportServer, // key : kakao
				identity() // value : kakaoAuthCodeRequestUrlProvider
			));
	}

	public String provide(OauthProvider provider){
		return getProvider(provider).provide();
	}

	private AuthCodeRequestUrlProvider getProvider(OauthProvider provider){
		return Optional.ofNullable(mapping.get(provider))
			.orElseThrow(() -> new RuntimeException("지원하지 않는 소셜 로그인 타입입니다."));
	}

}
