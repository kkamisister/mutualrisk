package com.example.mutualrisk.common.oauth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KakaoAccount(
	Profile profile,
	String email
) {
	public record Profile(
		String nickname,
		@JsonProperty("profile_image_url")
		String profileImageUrl
	) {}
}
