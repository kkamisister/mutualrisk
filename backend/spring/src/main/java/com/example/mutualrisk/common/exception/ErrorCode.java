package com.example.mutualrisk.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * API 응답시 반환되는 status와 message를 담는 enum
 */

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 사용할 HttpStatus + Message 조합을 작성

    // 정상적인 응답인 경우
    NORMAL_RESPONSE(HttpStatus.OK, "정상 응답 반환"),

    // 테스트용 에러
    SOME_ERROR_RESPONSE(HttpStatus.INTERNAL_SERVER_ERROR, "에러에러")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
