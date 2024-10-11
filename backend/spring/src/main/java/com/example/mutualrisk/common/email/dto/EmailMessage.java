package com.example.mutualrisk.common.email.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
public class EmailMessage {

	private String to;
	private String subject;
	private String message;

	@Override
	public String toString() {
		return "EmailMessage{" +
			"to='" + to + '\'' +
			", subject='" + subject + '\'' +
			", message='" + message + '\'' +
			'}';
	}
}
