package com.example.mutualrisk.common.oauth.dto;


public record AuthToken(

	String accessToken
) {
	public static AuthToken of(String accessToken){
		return new AuthToken(accessToken);
	}

}
