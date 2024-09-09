package com.example.mutualrisk.common.oauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KakaoToken(

	@JsonProperty("token_type")
	String tokenType,
	@JsonProperty("access_token")
	String accessToken,
	@JsonProperty("expires_in")
	String expiresIn,
	@JsonProperty("refresh_token")
	String refreshToken,
	@JsonProperty("refresh_token_expires_in")
	String refreshTokenExpiresIn,
	@JsonProperty("scope")
	String scope

) {
}
