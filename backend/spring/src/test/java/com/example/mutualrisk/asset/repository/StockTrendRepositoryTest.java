package com.example.mutualrisk.asset.repository;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import com.example.mutualrisk.asset.entity.StockTrend;
import com.example.mutualrisk.common.config.QuerydslConfig;

class StockTrendRepositoryTest {

	@Test
	void findByAssetId() {


	}
}