// package com.example.mutualrisk.common.fastapi;
//
// import static org.assertj.core.api.Assertions.*;
// import static org.junit.jupiter.api.Assertions.*;
//
// import java.io.IOException;
// import java.util.Arrays;
// import java.util.HashMap;
// import java.util.Map;
//
// import org.junit.jupiter.api.AfterAll;
// import org.junit.jupiter.api.AfterEach;
// import org.junit.jupiter.api.BeforeAll;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.MockitoAnnotations;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.context.DynamicPropertyRegistry;
// import org.springframework.test.context.DynamicPropertySource;
// import org.springframework.test.context.TestPropertySource;
// import org.springframework.web.client.RestClientException;
// import org.springframework.web.client.RestTemplate;
//
// import okhttp3.mockwebserver.MockResponse;
// import okhttp3.mockwebserver.MockWebServer;
// import okhttp3.mockwebserver.RecordedRequest;
//
//
// @SpringBootTest
// class FastApiServiceTest {
//
// 	private static MockWebServer mockWebServer;
//
// 	@Autowired
// 	private FastApiService fastApiService;
//
// 	@BeforeAll
// 	static void setUp() throws IOException {
// 		mockWebServer = new MockWebServer();
// 		mockWebServer.start();
// 	}
//
// 	@AfterAll
// 	static void tearDown() throws IOException {
// 		mockWebServer.shutdown();
// 	}
//
// 	@DynamicPropertySource
// 	static void registerDynamicProperties(DynamicPropertyRegistry registry) {
// 		registry.add("spring.fastapi.portfolio.url", () -> "http://localhost:" + mockWebServer.getPort() + "/fastapi/v1/portfolio");
// 		registry.add("spring.fastapi.hadoop.url", () -> "http://localhost:" + mockWebServer.getPort() + "/optimize");
// 	}
//
// 	@Test
// 	void sendPortfolioDataTest() throws Exception {
// 		// Mock FastAPI response
// 		MockResponse mockResponse = new MockResponse()
// 			.setResponseCode(HttpStatus.OK.value())
// 			.addHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
// 			.setBody("{ \"key\": \"portfolio_result\" }");
//
// 		mockWebServer.enqueue(mockResponse);
//
// 		// Set up the request body
// 		Map<String, Object> requestBody = new HashMap<>();
// 		requestBody.put("expected_returns", Arrays.asList(0.1, 0.2, 0.3));
// 		requestBody.put("prices_dataFrame", Arrays.asList(
// 			Arrays.asList(0.1, 0.2, 0.3),
// 			Arrays.asList(0.5, 0.7, 0.1),
// 			Arrays.asList(0.3, 0.9, 0.8)
// 		));
// 		requestBody.put("lower_bounds", Arrays.asList(0.0, 0.0, 0.0));
// 		requestBody.put("upper_bounds", Arrays.asList(1.0, 1.0, 1.0));
// 		requestBody.put("exact_proportion", Arrays.asList(0.5, 0.5, 0.0));
//
// 		// Make the call
// 		Map<String, Object> result = fastApiService.sendPortfolioData(requestBody);
//
// 		// Validate the response
// 		assertThat(result.get("key")).isEqualTo("portfolio_result");
//
// 		// Check the request sent to the mock server
// 		RecordedRequest recordedRequest = mockWebServer.takeRequest();
// 		assertThat(recordedRequest.getPath()).isEqualTo("/fastapi/v1/portfolio");
// 	}
//
// 	@Test
// 	void sendPortfolioDataTestFail() throws Exception {
// 		// Mock FastAPI response
// 		MockResponse mockResponse = new MockResponse()
// 			.setResponseCode(500)
// 			.addHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
// 			.setBody("{ \"key\": \"portfolio_result\" }");
//
// 		mockWebServer.enqueue(mockResponse);
//
// 		// Set up the request body
// 		Map<String, Object> requestBody = new HashMap<>();
// 		requestBody.put("expected_returns", Arrays.asList(0.1, 0.2, 0.3));
// 		requestBody.put("prices_dataFrame", Arrays.asList(
// 			Arrays.asList(0.1, 0.2, 0.3),
// 			Arrays.asList(0.5, 0.7, 0.1),
// 			Arrays.asList(0.3, 0.9, 0.8)
// 		));
// 		requestBody.put("lower_bounds", Arrays.asList(0.0, 0.0, 0.0));
// 		requestBody.put("upper_bounds", Arrays.asList(1.0, 1.0, 1.0));
// 		requestBody.put("exact_proportion", Arrays.asList(0.5, 0.5, 0.0));
//
//
// 		assertThatThrownBy(() -> {
// 			fastApiService.sendPortfolioData(requestBody);
// 		})
// 			.isInstanceOf(RuntimeException.class)
// 			.hasMessageContaining("FastAPI 서버와의 통신 중 예외가 발생했습니다.");
//
// 		// assertThatThrownBy(() -> {
// 		// 	fastApiService.sendPortfolioData((requestBody));
// 		// })
// 		// 	.isInstanceOf(RestClientException.class)
// 		// 	.hasMessageContaining("FastAPI 서버와의 통신 중 예외가 발생했습니다.");
//
// 	}
//
// 	@Test
// 	void getRecommendDataTest() throws Exception {
// 		// Mock FastAPI 응답 설정
// 		MockResponse mockResponse = new MockResponse()
// 			.setResponseCode(HttpStatus.OK.value())
// 			.addHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
// 			.setBody("{ \"recommendation\": \"success\" }");
//
// 		mockWebServer.enqueue(mockResponse);
//
// 		// 테스트할 요청 데이터 설정
// 		Map<String, Object> requestBody = new HashMap<>();
// 		requestBody.put("param", "test");
//
// 		// 실제 호출
// 		Map<String, Object> result = fastApiService.getRecommendData(requestBody).get();
//
// 		// 검증
// 		assertThat(result.get("recommendation")).isEqualTo("success");
//
// 		// 요청 확인
// 		RecordedRequest recordedRequest = mockWebServer.takeRequest();
// 		assertThat(recordedRequest.getPath()).isEqualTo("/optimize");
// 	}
//
// }