package com.example.mutualrisk.common.oauth.dto;

import lombok.Builder;

@Builder
public class LoginInfo {

	AuthToken authToken;
	String userName;

	public static LoginInfo of(AuthToken authToken,String userName){
		return new LoginInfo(authToken,userName);
	}
}
