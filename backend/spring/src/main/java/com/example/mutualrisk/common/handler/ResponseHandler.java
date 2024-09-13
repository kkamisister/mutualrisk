package com.example.mutualrisk.common.handler;

import static com.example.mutualrisk.common.dto.CommonResponse.*;

import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

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
