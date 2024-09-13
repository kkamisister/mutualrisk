package com.example.mutualrisk.test.controller;

import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 테스트용 컨트롤러
 * jwt 로직에서 제외시킴(검증 로직 x)
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/test")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        throw new MutualRiskException(ErrorCode.SOME_ERROR_RESPONSE);
    }
}
