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

    // 토큰 관련 에러
    TOKEN_REISSUE_FAIL(HttpStatus.BAD_REQUEST,"토큰 재발급에 문제가 발생했습니다"),

    // 정상적인 응답인 경우
    NORMAL_RESPONSE(HttpStatus.OK, "정상 응답 반환"),

    // asset_history table에 주어진 날짜에 해당하는 자산 가격 정보가 존재하지 않을 시 발생하는 에러
    ASSET_HISTORY_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "주어진 날짜에 해당하는 자산 가격 정보가 존재하지 않습니다"),

    // 테스트용 에러
    SOME_ERROR_RESPONSE(HttpStatus.INTERNAL_SERVER_ERROR, "에러에러"),
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST,"해당하는 유저가 존재하지 않습니다"),
    ASSET_NOT_FOUND(HttpStatus.BAD_REQUEST,"해당 자산이 존재하지 않습니다"),
    ASSET_NOT_FOUND_IN_USER_LIST(HttpStatus.BAD_REQUEST,"유저 관심종목에 해당 자산이 없습니다"),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
