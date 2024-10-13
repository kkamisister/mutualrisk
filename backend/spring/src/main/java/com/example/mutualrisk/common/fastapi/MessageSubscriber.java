package com.example.mutualrisk.common.fastapi;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;

@Service
public class MessageSubscriber implements MessageListener {

	private final SseService sseService;
	private static int idx = 1;

	@Autowired
	public MessageSubscriber(RedisMessageListenerContainer redisMessageListenerContainer, SseService sseService) {
		this.sseService = sseService;
		// 채널을 구독하는 부분
		redisMessageListenerContainer.addMessageListener(this, new ChannelTopic("responseChannel"));
	}

	@Override
	public void onMessage(Message message, byte[] pattern) {
		System.out.println("onMessage 호출됨");
		String result = new String(message.getBody());
		System.out.println("result = " + result);
		String userId = extractUserIdFromMessage(result); // 메시지에서 userId를 추출하는 로직 필요

		// 사용자에게 SSE로 결과 전송
		sseService.sendMessage(String.valueOf(idx++), result);
	}

	private String extractUserIdFromMessage(String message) {
		// 메시지에서 userId 추출 로직을 구현 (예시: JSON 파싱)
		return "userId";  // 실제 메시지에서 userId를 추출하는 로직을 구현해야 함
	}
}
