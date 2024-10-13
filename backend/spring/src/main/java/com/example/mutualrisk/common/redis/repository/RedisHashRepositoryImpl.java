package com.example.mutualrisk.common.redis.repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.example.mutualrisk.asset.service.AssetServiceImpl;
import com.example.mutualrisk.portfolio.dto.PortfolioRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class RedisHashRepositoryImpl implements RedisHashRepository{

	private final RedisTemplate<String,Object> redisTemplate;
	private final AssetServiceImpl assetServiceImpl;

	@Override
	public void saveHashData(String key, String subKey, Object value, long ttl) {
		if(Boolean.FALSE.equals(redisTemplate.hasKey(key))){
			redisTemplate.opsForHash().put(key,subKey,value);
			redisTemplate.expire(key,ttl, TimeUnit.MINUTES);
		}

		redisTemplate.opsForHash().put(key,subKey,value);
	}

	@Override
	public void removeHashData(String key, String subKey) {

		if(Boolean.FALSE.equals(redisTemplate.hasKey(key)))return;

		redisTemplate.opsForHash().delete(key,subKey);
	}

	@Override
	public Object getHashData(String key, String subKey) {
		if(Boolean.FALSE.equals(redisTemplate.hasKey(key))){
			return null;
		}

		return redisTemplate.opsForHash().get(key,subKey);
	}

	@Override
	public List<LocalDateTime> getCachedValidDates(String assetCode, String timeInterval) {

		String key = assetCode;
		String subKey = timeInterval;

		if(redisTemplate.opsForHash().hasKey(key,subKey)){
			List<String> cachedDateStrings = (List<String>) redisTemplate.opsForHash().get(key, subKey);
			// String으로 가져온 캐시된 날짜들을 LocalDateTime으로 변환
			List<LocalDateTime> validDates = cachedDateStrings.stream()
				.map(dateString -> {
					if (dateString == null) {
						return null; // null 값 그대로 유지
					}
					return LocalDateTime.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
				})
				.collect(Collectors.toList());

			return validDates;
		}
		return null;
	}

	@Override
	public void cacheValidDates(String assetCode, String timeInterval, List<LocalDateTime> validDates, long ttl) {
		String key = assetCode;
		String subKey = timeInterval;

		redisTemplate.opsForHash().put(key,subKey,validDates);
		redisTemplate.expire(key,ttl,TimeUnit.SECONDS);

	}

}
