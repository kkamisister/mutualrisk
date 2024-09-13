package com.example.mutualrisk.common.oauth.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;
import com.example.mutualrisk.common.oauth.dto.AuthToken;
import com.example.mutualrisk.common.oauth.dto.OauthUserInfo;
import com.example.mutualrisk.common.oauth.util.OauthProvider;
import com.example.mutualrisk.common.oauth.util.TokenProvider;
import com.example.mutualrisk.common.redis.repository.RedisHashRepository;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OauthLoginService {

	private final UserRepository userRepository;
	private final RedisHashRepository redisHashRepository;
	// private final AuthTokenGenerator authTokenGenerator;
	private final TokenProvider tokenProvider;
	private final RequestOauthInfoService requestOAuthInfoService;
	private final AuthCodeRequestUrlProviderComposite authCodeRequestUrlProviderComposite;

	public String getAuthCodeRequestUrl(OauthProvider provider){
		return authCodeRequestUrlProviderComposite.provide(provider);
	}


	public AuthToken login(OauthProvider provider, String code){
		OauthUserInfo userInfo = requestOAuthInfoService.request(provider,code);
		Integer userId = findOrCreateUser(userInfo);

		return tokenProvider.generate(userId);
	}

	/**
	 * authorization 헤더로부터 엑세스 토큰을 받고 로그아웃을 하는 메서드
	 * <p>
	 * 로그아웃시 기존 redis에 존재하던 유저의 토큰을 삭제한다
	 *
	 * @param authorization
	 * @return
	 */
	public ResponseWithMessage logout(String authorization){
		if(authorization == null || !authorization.startsWith("Bearer ")){
			throw new RuntimeException("잘못된 토큰입니다");
		}
		String accessToken = authorization.substring(7);
		redisHashRepository.removeHashData("jwt",accessToken);

		return new ResponseWithMessage(HttpStatus.OK.value(),"로그아웃 성공");
	}

	private Integer findOrCreateUser(OauthUserInfo oAuthUserInfo){
		return userRepository.findByEmail(oAuthUserInfo.getEmail())
			.map(User::getId)
			.orElseGet(() -> newUser(oAuthUserInfo));

	}

	private Integer newUser(OauthUserInfo oAuthUserInfo){
		User user = User.builder()
			.oauthId(oAuthUserInfo.getId()+"-"+oAuthUserInfo.getOAuthProvider())
			.email(oAuthUserInfo.getEmail())
			.nickname(oAuthUserInfo.getNickName())
			.image(oAuthUserInfo.getImage())
			.build();

		userRepository.save(user);
		return user.getId();
	}
}
