package com.example.mutualrisk.common.fastapi;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseService {

	private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

	public SseEmitter subscribe(String userId) {
		SseEmitter emitter = new SseEmitter(60000L); // 60초 타임아웃 설정
		emitters.put(userId, emitter);

		emitter.onCompletion(() -> emitters.remove(userId));
		emitter.onTimeout(() -> emitters.remove(userId));
		emitter.onError((e) -> emitters.remove(userId));

		return emitter;
	}

	public void sendMessage(String userId, String message) {
		SseEmitter emitter = emitters.get(userId);
		if (emitter != null) {
			try {
				emitter.send(SseEmitter.event().data(message));
				emitter.complete(); // 메시지 전송 후 연결 종료 (필요에 따라 제거 가능)
			} catch (IOException e) {
				emitter.completeWithError(e);
				emitters.remove(userId);
			}
		}
	}
}
