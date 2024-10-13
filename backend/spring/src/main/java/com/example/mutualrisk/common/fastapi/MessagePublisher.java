package com.example.mutualrisk.common.fastapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.mutualrisk.portfolio.dto.PortfolioRequest;

@Service
public class MessagePublisher {

	private final RedisTemplate<String, Object> redisTemplate;

	@Autowired
	public MessagePublisher(RedisTemplate<String, Object> redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	// Redis 리스트에 요청을 넣는 방식으로 변경
	public void publish(String queueName, PortfolioRequest.PortfolioRequestDto message) {
		// 메시지를 Redis 리스트에 넣음 (LPUSH를 사용해서 큐에 메시지를 추가)
		redisTemplate.opsForList().leftPush(queueName, message);
	}
}
