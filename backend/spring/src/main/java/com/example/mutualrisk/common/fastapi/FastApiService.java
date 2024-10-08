package com.example.mutualrisk.common.fastapi;

import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FastApiService {

	private final RestTemplate restTemplate;

	public FastApiService() {
		this.restTemplate = new RestTemplate();
	}

	public Map<String, Object> sendPortfolioData(Map<String, Object> requestBody) {
		String url = "https://j11a607.p.ssafy.io/fastapi/v1/portfolio";
		try {

			ResponseEntity<Map> response = restTemplate.postForEntity(url, requestBody, Map.class);

			if (response.getStatusCode().is2xxSuccessful()) {
				Map<String, Object> responseBody = response.getBody();
				return responseBody;
			} else {
				// 에러 응답 처리
				log.warn("FastAPI 서버에서 오류 응답을 받았습니다. 상태 코드: {}", response.getStatusCode());
				throw new MutualRiskException(ErrorCode.EFFICIENT_PORTFOLIO_API_ERROR);
			}
		} catch (RestClientException e) {
			// 예외 처리
			log.warn("FastAPI 서버 오류 메시지: {}", e.getMessage());
			throw new MutualRiskException(ErrorCode.EFFICIENT_PORTFOLIO_API_ERROR);
		}
	}
}
