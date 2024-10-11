package com.example.mutualrisk.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * 모든 API 처리에 대한 공통 응답 DTO 클래스.<br><br>
 *
 * {@code ResponseWithData}는 데이터가 들어가야 하는 경우 사용
 * {@code ResponseWithMessage}는 데이터가 필요하지 않고 메세지만 들어가야 하는 경우 사용
 */
public record CommonResponse() {

    @Schema(description = "데이터가 결과로 반환되는 경우 사용되는 공통 응답 객체입니다.")
    public record ResponseWithData<T>(
            @Schema(description = "응답 코드를 나타냅니다. 응답 코드는 HttpStatus 로 표현됩니다.", example = "200")
            int status,
            @Schema(description = "응답 메세지를 나타냅니다. 응답 메세지는 문자열로 표현됩니다.", example = "처리에 성공했습니다.")
            String message,
            @Schema(description = "요청 결과에 대한 데이터가 들어갑니다.")
            T data
    ) {

    }

    @Schema(description = "데이터 없이 메시지로만 반환되는 경우 사용되는 공통 응답 객체입니다.")
    public record ResponseWithMessage(
            @Schema(description = "응답 코드를 나타냅니다. 응답 코드는 HttpStatus 로 표현됩니다.", example = "200")
            int status,
            @Schema(description = "응답 메세지를 나타냅니다. 응답 메세지는 문자열로 표현됩니다.", example = "처리에 성공했습니다.")
            String message
    ) {

    }
}
