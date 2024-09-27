package com.example.mutualrisk.portfolio.controller;

import com.example.mutualrisk.common.dto.CommonResponse;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithMessage;
import com.example.mutualrisk.portfolio.service.PortfolioService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.mutualrisk.common.dto.CommonResponse.ResponseWithData;

import com.example.mutualrisk.portfolio.dto.PortfolioResponse.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/portfolio")
@Slf4j
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/my")
    public ResponseEntity<ResponseWithData<PortfolioResultDto>> getUserPortfolio(HttpServletRequest request) {
        Integer userId = (Integer)request.getAttribute("userId");

        ResponseWithData<PortfolioResultDto> portfolioInfo = portfolioService.getPortfolioInfo(userId);

        return ResponseEntity.status(portfolioInfo.status()).body(portfolioInfo);
    }

    /**
     * 전체 유저를 대상으로 비중변화가 +-10%p or 유저의 상한/하한을 넘은 경우 알람을 보내는 메서드
     * 이 메서드는 일반 유저가 접근할 수 없이 ADMIN 권한의 유저만 접근할 수 있도록 설정해야 할 듯
     *
     * Todo: 메서드 접근 권한
     * @return
     */
    @PostMapping("/checking")
    public ResponseEntity<ResponseWithMessage> checkPortfolios(){

        ResponseWithMessage responseWithMessage = portfolioService.sendRefreshMail();

        return ResponseEntity.status(responseWithMessage.status()).body(responseWithMessage);

    }
}
