package com.example.mutualrisk.common.fastapi;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;

import java.util.Map;

@Service
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
				throw new RuntimeException("FastAPI 서버에서 오류 응답을 받았습니다. 상태 코드: " + response.getStatusCode());
			}
		} catch (RestClientException e) {
			// 예외 처리
			throw new RuntimeException("FastAPI 서버와의 통신 중 예외가 발생했습니다.", e);
		}
	}

	public Map<String,Object> getRecommendData(Map<String, Object> requestBody) {

		String url = "http://j11a607a.p.ssafy.io:8000/optimize";

		try{
			ResponseEntity<Map> response = restTemplate.postForEntity(url, requestBody, Map.class);

			if(response.getStatusCode().is2xxSuccessful()){
				Map<String, Object> responseBody = response.getBody();
				return responseBody;
			}
			else{
				// 에러 응답 처리
				throw new RuntimeException("FastAPI 서버에서 오류 응답을 받았습니다. 상태 코드: " + response.getStatusCode());
			}

		}catch(RestClientException e){

			throw new RuntimeException("FastAPI 서버에서 오류 응답을 받았습니다. 상태 코드 : "+ e);
		}

	}
}
