package com.example.mutualrisk.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Custom Exception
 * 로직에서 예상되는 예외가 있을 시, 이 에러를 던지도록 구현
 * (혹은 상속해서 사용)
 */

@Getter
@RequiredArgsConstructor
public class MutualRiskException extends RuntimeException {
    private final ErrorCode errorCode;
}
