package com.example.mutualrisk.common.config;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

	@Value("${spring.data.mongodb.uri}")
	private String uri;

	@Value("${spring.data.mongodb.database}")
	private String databaseName;

	@Override
	protected String getDatabaseName() {
		return databaseName;
	}

	@Override
	public MongoClient mongoClient(){
		ConnectionString connectionString = new ConnectionString(uri);

		MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
			.applyConnectionString(connectionString)
			.build();

		return MongoClients.create(mongoClientSettings);
	}

	@Bean
	public MongoTemplate mongoTemplate(){
		return new MongoTemplate(new SimpleMongoClientDatabaseFactory(mongoClient(), getDatabaseName()));
	}
}


// 펀드 데이터의 수익률 with sp500 을 새롭게 계산할 경우, 이것으로 대체
// @Override
// public MongoClient mongoClient(){
// 	ConnectionString connectionString = new ConnectionString(uri);
//
// 	MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
// 		.applyConnectionString(connectionString)
// 		.applyToSocketSettings(builder ->
// 			builder.connectTimeout(0, TimeUnit.MILLISECONDS)  // 연결 타임아웃 무제한
// 				.readTimeout(0, TimeUnit.MILLISECONDS))   // 소켓 타임아웃 무제한
// 		.applyToClusterSettings(builder ->
// 			builder.serverSelectionTimeout(0, TimeUnit.MILLISECONDS))  // 서버 선택 타임아웃 무제한
// 		.build();
//
// 	return MongoClients.create(mongoClientSettings);
// }