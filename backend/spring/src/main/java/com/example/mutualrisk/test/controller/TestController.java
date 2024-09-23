package com.example.mutualrisk.test.controller;

import java.util.List;

import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.fund.entity.Fund;
import com.example.mutualrisk.fund.service.FundService;

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

    private final FundService fundService;

    @GetMapping("/hello")
    public String hello() {
        throw new MutualRiskException(ErrorCode.SOME_ERROR_RESPONSE);
    }

    @GetMapping("/mongo")
    public List<Fund> mongoTest(){
        return fundService.getTop20Funds();
    }
}
