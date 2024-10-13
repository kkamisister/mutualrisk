package com.example.mutualrisk.common.redis.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.example.mutualrisk.portfolio.dto.PortfolioRequest;

public interface RedisHashRepository {
	void saveHashData(String key,String subKey,Object value,long ttl);
	void removeHashData(String key,String subKey);

	Object getHashData(String key,String subKey);

	List<LocalDateTime> getCachedValidDates(String assetCode,String timeInterval);
	void cacheValidDates(String assetCode,String timeInterval,List<LocalDateTime> validDates,long ttl);

}
