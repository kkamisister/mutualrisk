package com.example.mutualrisk.common.oauth.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginInfo {

	AuthToken authToken;
	String userName;

	public static LoginInfo of(AuthToken authToken,String userName){
		return new LoginInfo(authToken,userName);
	}
}
