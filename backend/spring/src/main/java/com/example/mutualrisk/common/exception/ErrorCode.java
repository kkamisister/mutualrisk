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

    // 자산관련 에러
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST,"해당하는 유저가 존재하지 않습니다"),
    ASSET_NOT_FOUND(HttpStatus.BAD_REQUEST,"해당 자산이 존재하지 않습니다"),
    ASSET_NOT_FOUND_IN_USER_LIST(HttpStatus.BAD_REQUEST,"유저 관심종목에 해당 자산이 없습니다"),
    ASSET_ALREADY_EXIST(HttpStatus.CONFLICT,"이미 관심목록에 존재하는 자산입니다"),

    // 펀드관련 에러
    FUND_NOT_FOUND(HttpStatus.BAD_REQUEST,"해당하는 펀드가 존재하지 않습니다"),
    NO_HOLD_AND_BUY_AMOUNT(HttpStatus.BAD_REQUEST,"보유량 및 구매량 정보가 존재하지 않습니다"),
    SP_NOT_FOUND(HttpStatus.BAD_REQUEST,"S&P500 자산이 존재하지 않습니다"),
    PARAMETER_INVALID(HttpStatus.BAD_REQUEST, "올바른 parameter 값이 아닙니다"),

    // 포트폴리오관련 에러
    PORTFOLIO_NOT_FOUND(HttpStatus.BAD_REQUEST,"포트폴리오가 존재하지 않습니다"),
    EFFICIENT_PORTFOLIO_API_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "최적 포트폴리오 계산 fastAPI 호출 중 예외가 발생하였습니다"), // fastAPI 관련 에러
    HADOOP_RECOMMEND_ASSET_API_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "하둡 종목 추천 api 호출 중 예외가 발생하였습니다"),

    // redis 파싱 관련 에러
    REDIS_PARSE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "redis 데이터를 파싱하는 도중 에러가 발생하였습니다");

    private final HttpStatus httpStatus;
    private final String message;
}
