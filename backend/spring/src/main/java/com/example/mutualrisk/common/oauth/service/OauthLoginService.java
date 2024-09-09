package com.example.mutualrisk.common.oauth.service;

import org.springframework.stereotype.Service;

import com.example.mutualrisk.common.oauth.dto.AuthToken;
import com.example.mutualrisk.common.oauth.dto.OauthUserInfo;
import com.example.mutualrisk.common.oauth.util.OauthProvider;
import com.example.mutualrisk.common.oauth.util.TokenProvider;
import com.example.mutualrisk.user.entity.User;
import com.example.mutualrisk.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OauthLoginService {

	private final UserRepository userRepository;
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
