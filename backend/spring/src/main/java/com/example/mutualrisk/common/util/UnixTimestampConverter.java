package com.example.mutualrisk.common.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

// @Converter(autoApply = true)
@Slf4j
public class UnixTimestampConverter implements AttributeConverter<LocalDateTime, Integer> {

	@Override
	public Integer convertToDatabaseColumn(LocalDateTime attribute) {
		log.info("여기1");
		// LocalDateTime을 int로 변환 (UNIX timestamp)
		return (attribute == null) ? null : (int) attribute.atZone(ZoneId.systemDefault()).toEpochSecond();
	}

	@Override
	public LocalDateTime convertToEntityAttribute(Integer dbData) {
		log.info("여기2");
		// int (UNIX timestamp)를 LocalDateTime으로 변환
		return (dbData == null) ? null : LocalDateTime.ofInstant(Instant.ofEpochSecond(dbData), ZoneId.systemDefault());
	}
}