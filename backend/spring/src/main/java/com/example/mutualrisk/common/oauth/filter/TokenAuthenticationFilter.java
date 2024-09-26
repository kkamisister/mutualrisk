package com.example.mutualrisk.common.oauth.filter;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.mutualrisk.common.oauth.util.TokenProvider;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class TokenAuthenticationFilter extends OncePerRequestFilter {

	private final TokenProvider tokenProvider;
	private static final String TOKEN_PREFIX = "Bearer ";

	/**
	 *
	 * JWT토큰의 유효성을 검증하는 필터
	 *
	 * @param request 사용자 요청
	 * @param response 서버 응답
	 * @param filterChain 다음 필터로 이동할 FilterChain 객체
	 * @throws ServletException 서블릿 관련 예외
	 * @throws IOException 요청 또는 응답에 대해 읽을 수 없는 경우
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		// // Preflight 요청인 경우, 바로 200 응답반환
		// if(CorsUtils.isPreFlightRequest(request)){
		// 	response.setStatus(HttpServletResponse.SC_OK);
		// 	return;
		// }

		log.warn("요청 메서드 : {}",request.getMethod());

		String accessToken = resolveToken(request);

		log.warn("accessToken : {}", accessToken);

		if(StringUtils.isEmpty(accessToken)){
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"유효하지 않은 구성의 JWT 토큰입니다.");
			return;
		}

		// 개발 편의를 위한 임시 로직
		// Bearer token에 "dummyAccessToken"을 입력하면, dummy user 정보로 인증된 후 넘어감
		if (accessToken.equals("dummyAccessToken")) {
			request.setAttribute("userId",1);
			filterChain.doFilter(request, response);
		}
		else {
			try{
				if(tokenProvider.validateToken(accessToken)){
					String userId = tokenProvider.extractSubject(accessToken);
					request.setAttribute("userId",userId);
				}
			}catch(MalformedJwtException | IllegalArgumentException e){
				log.info("유효하지 않은 구성의 JWT 토큰 입니다.");
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"유효하지 않은 구성의 JWT 토큰 입니다.");
				return;
			}catch(ExpiredJwtException e){
				log.info("만료된 JWT 토큰입니다.");

				// 리프레시 토큰을 가지고와서 재발급 시도
				// 유저가 토큰을 가지고 api를 호출했는데 401이 터진다면
				// - reissue-token 헤더가 있는지 확인해보고 있으면 유저의 accessToken을 갱신하면 된다
				// - 헤더가 없다면? => refresh도 만료되었거나 탈취당해서 재발급된 상태이므로 다시 로그인 해야한다
				String reissuedToken = tokenProvider.reissueToken(accessToken);

				log.info("재발급된 토큰 : {}", reissuedToken);
				if(StringUtils.hasText(reissuedToken)){
					response.setHeader("reissue-token",reissuedToken);
					response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"토큰을 재발급하였습니다.");
				}
				else{
					response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증에 실패했습니다.");
				}
				return;
			}

			filterChain.doFilter(request,response);
		}
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

		// Preflight 요청의 경우, 필터를 통과하여 WebMvcConfigurer에 걸리도록 설정
		if (request.getMethod().equals("OPTIONS")) {
			return true;
		}

		String path = request.getRequestURI();
		AntPathMatcher pathMatcher = new AntPathMatcher();


		// jwt 토큰 확인 로직에서 제외시킬 api path 설정
		// /api/v1/oauth/{anything} 경로와 /swagger 경로, test용 api 필터링 제외
		return pathMatcher.match("/api/v1/oauth/**", path)
			|| pathMatcher.match("/api/v1/swagger-ui/**", path)		// swagger ui 실행시 동작하는 api
			|| pathMatcher.match("/v3/api-docs/**", path)			// swagger ui 실행시 동작하는 api
			|| pathMatcher.match("/api/v1/test/**", path);
	}

	/**
	 *
	 * 헤더에 있는 엑세스 토큰을 가져오는 메서드
	 *
	 * @param request 사용자 요청
	 * @return 파싱한 사용자 요청 헤더 내부의 엑세스 토큰 값
	 */
	private String resolveToken(HttpServletRequest request){
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);

		if(!ObjectUtils.isEmpty(token) && token.startsWith(TOKEN_PREFIX)){
			return token.substring(TOKEN_PREFIX.length());
		}

		return null;
	}

}
