package com.example.mutualrisk.common.oauth.service;

import static java.util.function.UnaryOperator.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.mutualrisk.common.oauth.dto.OauthUserInfo;
import com.example.mutualrisk.common.oauth.util.OauthProvider;

@Service
public class RequestOauthInfoService {

	private final Map<OauthProvider, OauthClient> clients;

	public RequestOauthInfoService(List<OauthClient> clients){
		this.clients = clients.stream().collect(
			Collectors.toUnmodifiableMap(OauthClient::oAuthProvider, identity())
		);
	}

	public OauthUserInfo request(OauthProvider provider, String code){
		OauthClient client = clients.get(provider);
		String accessToken = client.requestAccessToken(new KakaoLoginParam(code));
		return client.requestOAuthInfo(accessToken);
	}


}
