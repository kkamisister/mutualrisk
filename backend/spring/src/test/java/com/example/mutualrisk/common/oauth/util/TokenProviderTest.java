package com.example.mutualrisk.common.oauth.util;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import com.example.mutualrisk.common.oauth.service.TokenService;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@SpringBootTest
public class TokenProviderTest {

	@Autowired
	private TokenProvider tokenProvider;

	@Autowired
	private TokenService tokenService;

	@BeforeEach
	void setUp() {
		ReflectionTestUtils.setField(tokenProvider, "key", "Z29nby10bS1zZXJ2ZXItZGxyamVvYW9yb3JodG9kZ290c3Atam9vbmdhbmduaW0teWVvbHNpbWhpaGFswvuqoxyve");
		// PostConstruct 역할을 수동으로 처리 (setSecretKey 호출)
		ReflectionTestUtils.invokeMethod(tokenProvider, "setSecretKey");
	}

	@Test
	@DisplayName("엑세스 토큰 발급 테스트")
	void testGenerateAccessToken() {
		String subject = "user123";
		Date expiryDate = new Date(System.currentTimeMillis() + 3600000); // 1시간 유효

		String token = tokenProvider.generateAccessToken(subject, expiryDate);
		assertNotNull(token);
	}

	@Test
	@DisplayName("엑세스 토큰 유효성 검증")
	void testValidateToken() {
		String subject = "user123";
		Date expiryDate = new Date(System.currentTimeMillis() + 3600000); // 1시간 유효

		// 액세스 토큰 생성
		String token = tokenProvider.generateAccessToken(subject, expiryDate);

		// 토큰 유효성 검증
		assertTrue(tokenProvider.validateToken(token)); // 유효한 토큰인지 확인

		// 만료된 토큰 생성
		String expiredToken = tokenProvider.generateAccessToken(subject, new Date(System.currentTimeMillis() - 3600000)); // 이미 만료된 토큰

		// 만료된 토큰인지 확인
		// 확인 과정에서 ExpiredJwtException이 발생해야 함
		assertThrows(ExpiredJwtException.class, () -> {
			tokenProvider.validateToken(expiredToken);
		});
	}

	@Test
	@DisplayName("엑세스 토큰에서 subject 추출")
	void testExtractSubject() {
		String subject = "user123";
		Date expiryDate = new Date(System.currentTimeMillis() + 3600000); // 1시간 유효

		// 액세스 토큰 생성
		String token = tokenProvider.generateAccessToken(subject, expiryDate);

		// 토큰에서 subject 추출
		String extractedSubject = tokenProvider.extractSubject(token);
		assertEquals(subject, extractedSubject); // subject가 올바르게 추출되었는지 확인
	}

	// @Test
	// void testReissueToken() {
	// 	String subject = "11235";
	// 	Date expiryDate = new Date(System.currentTimeMillis() + 3600000); // 1시간 유효
	// 	String accessToken = tokenProvider.generateAccessToken(subject, expiryDate);
	//
	// 	assertTrue(accessToken.contains(".")); // 토큰 형식 확인
	//
	// 	// 리프레시 토큰 생성 및 저장
	// 	String refreshToken = tokenProvider.generateAccessToken(subject, new Date(System.currentTimeMillis() + 604800000)); // 1주일 유효
	// 	tokenService.saveOrUpdate(accessToken, refreshToken);
	//
	// 	// 실제 리프레시 토큰 사용하여 검증
	// 	String newAccessToken = tokenProvider.reissueToken(accessToken);
	// 	assertTrue(newAccessToken.contains(".")); // 리프레시 토큰 형식 확인
	// 	//
	// 	// assertNotNull(newAccessToken); // 새로운 액세스 토큰이 생성되었는지 확인
	//
	// 	// // 만료된 리프레시 토큰 테스트
	// 	// Date expiredDate = new Date(System.currentTimeMillis() - 3600000); // 이미 만료된 리프레시 토큰
	// 	// tokenService.saveOrUpdate(accessToken, tokenProvider.generateAccessToken(subject, expiredDate));
	// 	//
	// 	// String expiredToken = tokenProvider.reissueToken(accessToken);
	// 	// assertNull(expiredToken); // 만료된 리프레시 토큰으로는 재발급되지 않아야 함
	// }
}
