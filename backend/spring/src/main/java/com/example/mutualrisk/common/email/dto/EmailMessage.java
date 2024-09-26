package com.example.mutualrisk.common.email.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EmailMessage {

	private String to;
	private String subject;
	private String message;
}
