package com.example.mutualrisk.common.handler;

import static com.example.mutualrisk.common.dto.CommonResponse.*;

import java.util.stream.Collectors;

import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ResponseHandler<T> implements ResponseBodyAdvice<T> {
    /**
     *
     * @param e : 발생한 사용자 정의 예외(MutualRiskException)
     * @return ErrorResponse 객체 반환
     */
    @ExceptionHandler(MutualRiskException.class)
    private ResponseEntity<ResponseWithMessage> handleBuiltInException(MutualRiskException e) {
        ErrorCode errorCode = e.getErrorCode();
        ResponseWithMessage responseWithMessage = new ResponseWithMessage(errorCode.getHttpStatus().value(), errorCode.getMessage());

        System.out.println("responseWithMessage.status() = " + responseWithMessage.status());
        System.out.println("responseWithMessage.message() = " + responseWithMessage.message());

        return new ResponseEntity<>(responseWithMessage, errorCode.getHttpStatus());
    }

    /**
     * 컨트롤러 단에서 발생하는 유효성 예외를 받는 메서드
     * @param e
     * @return
     */
    @ExceptionHandler(ConstraintViolationException.class)
    private ResponseEntity<ResponseWithMessage> handleConstraintViolationException(ConstraintViolationException e) {
        // ConstraintViolation에서 각 메시지 추출
        String errorMessage = e.getConstraintViolations().stream()
            .map(ConstraintViolation::getMessage)  // 메시지만 가져오기 (필드명 제외)
            .collect(Collectors.joining(", "));    // 여러 메시지 연결

        // HTTP 상태 코드와 커스텀 메시지 생성
        ResponseWithMessage responseWithMessage = new ResponseWithMessage(HttpStatus.BAD_REQUEST.value(), errorMessage);

        System.out.println("responseWithMessage.status() = " + responseWithMessage.status());
        System.out.println("responseWithMessage.message() = " + responseWithMessage.message());

        return new ResponseEntity<>(responseWithMessage, HttpStatus.BAD_REQUEST);
    }

    // Controller에 대해, Wrapping을 할지 말지를 결정
    // 현재는 객체를 반환할 때 별도의 wrapping 과정을 거치지 않으므로, 일괄적으로 false를 반환
    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return false;
    }

    @Override
    public T beforeBodyWrite(T body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        return null;
    }

}
