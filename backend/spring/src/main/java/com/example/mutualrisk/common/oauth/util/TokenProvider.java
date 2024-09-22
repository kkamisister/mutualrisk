package com.example.mutualrisk.common.oauth.util;


import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.example.mutualrisk.common.exception.ErrorCode;
import com.example.mutualrisk.common.exception.MutualRiskException;
import com.example.mutualrisk.common.oauth.dto.AuthToken;
import com.example.mutualrisk.common.oauth.service.TokenService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
// @RequiredArgsConstructor
@NoArgsConstructor
public class TokenProvider {

	// 1시간
	private static final long ACCESS_TOKEN_VALIDITY_SECONDS = 1000 * 60 * 60L;
	// private static final long ACCESS_TOKEN_VALIDITY_SECONDS = 1000 * 60;
	// 일주일
	private static final long REFRESH_TOKEN_VALIDITY_SECONDS = 1000 * 60 * 60 * 24L * 7;

	// private final TokenService tokenService;
	@Autowired
	TokenService tokenService;

	@Value("${spring.jwt.secret-key}")
	private String key;
	private SecretKey secretKey;

	@PostConstruct
	public void setSecretKey(){
		log.warn("key : {}",this.key);
		secretKey = Keys.hmacShaKeyFor(key.getBytes());
	}

	public String generateAccessToken(String subject,Date expiredDate){
		return generateToken(subject,expiredDate);
	}

	public void generateRefreshToken(String subject,Date expiredDate,String accessToken){
		String refreshToken = generateToken(subject,expiredDate);
		tokenService.saveOrUpdate(accessToken,refreshToken);
	}

	private String generateToken(String subject, Date expiredDate){
		return Jwts.builder()
			.setSubject(subject)
			.issuedAt(new Date())
			.setExpiration(expiredDate)
			.signWith(secretKey, SignatureAlgorithm.HS256)
			.compact();
	}

	public boolean validateToken(String token){

		Claims claims = parseClaims(token);
		return claims.getExpiration().after(new Date());
	}

	public String extractSubject(String accessToken){
		Claims claims = parseClaims(accessToken);
		return claims.getSubject();
	}

	private Claims parseClaims(String accessToken){

		return Jwts.parser().verifyWith(secretKey).build()
			.parseSignedClaims(accessToken)
			.getPayload();
		// try{
		// 	return Jwts.parser().verifyWith(secretKey).build()
		// 		.parseSignedClaims(accessToken)
		// 		.getPayload();
		//
		// }catch(ExpiredJwtException e){
		// 	log.warn("만료된 토큰입니다");
		// 	log.warn("e.getMessage() : {}",e.getMessage());
		// 	log.warn(String.valueOf(e.getClaims()));
		// 	return e.getClaims();
		// }
	}
	public AuthToken generate(Integer userId){

		Long now = (new Date()).getTime();
		Date accessTokenExpiredDate = new Date(now + ACCESS_TOKEN_VALIDITY_SECONDS);
		Date refreshTokenExpiredDate = new Date(now + REFRESH_TOKEN_VALIDITY_SECONDS);

		String subject = userId.toString();
		String accessToken = generateAccessToken(subject, accessTokenExpiredDate);
		generateRefreshToken(subject,refreshTokenExpiredDate,accessToken);

		return AuthToken.of(accessToken);
	}

	public String reissueToken(String accessToken){

		log.warn("재발급 하기 전 엑세스 토큰 : {}",accessToken);
		if(StringUtils.hasText(accessToken)){

			// 오류가 발생한 경우, 다시 로그인 해야함
			// 해커가 토큰을 탈취하고 재발급을 받았다면, 내가 가진 토큰과는 다르므로 찾지 못할것임
			// 그때 예외가 발생
			String refreshToken = tokenService.findByAccessToken(accessToken)
				.orElseThrow(() -> new MutualRiskException(ErrorCode.TOKEN_REISSUE_FAIL));

			log.warn("발견한 리프레시 토큰 : {}",refreshToken);

			// refreshToken이 아직 유효하다면, accessToken을 재발급 받는다
			if(validateToken(refreshToken)){
				String subject = extractSubject(refreshToken);
				AuthToken authToken = generate(Integer.parseInt(subject));
				log.warn("재발급 된 엑세스 토큰 : {}",authToken.accessToken());
				return authToken.accessToken();
			}

		}
		return null;
	}

}
