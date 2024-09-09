package com.example.mutualrisk.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ClientConfig {

    /**
     * 리다이렉트 시 받은 Authorization Code와
     * Client ID, Client Secret을 가지고 Access Token을 요청을 보낼 때 사용
     *
     * @return
     */
    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
