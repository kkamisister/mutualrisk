package com.example.mutualrisk.common.client;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Component
public class MutualRiskClient {
    private final WebClient webClient = WebClient.builder()
        .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
        .build();

    public WebClient.ResponseSpec get(String uri) {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();

        return this.get(uri, headers);
    }

    public WebClient.ResponseSpec getFromMap(String uri, Map<String, String> headers) {
        MultiValueMap<String, String> headerMulti = new LinkedMultiValueMap<>();
        headerMulti.setAll(headers);

        return this.get(uri, headerMulti);
    }

    public WebClient.ResponseSpec get(String uri, MultiValueMap<String, String> headers) {
        return webClient.get()
            .uri(uri)
            .headers(httpHeaders -> httpHeaders.addAll(headers))
            .retrieve();
    }

    public WebClient.ResponseSpec post(String uri, Object body) {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();

        return this.post(uri, body, headers);
    }

    public WebClient.ResponseSpec postFromMap(String uri, Object body, Map<String, String> headers) {
        MultiValueMap<String, String> headerMulti = new LinkedMultiValueMap<>();
        headerMulti.setAll(headers);

        return this.post(uri, body, headerMulti);
    }

    public WebClient.ResponseSpec post(String uri, Object body, MultiValueMap<String, String> headers) {
        return webClient.post()
            .uri(uri)
            .headers(httpHeaders -> httpHeaders.addAll(headers))
            .bodyValue(body)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
                throw new RuntimeException("4xx : " + clientResponse.logPrefix());
            })
            .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
                throw new RuntimeException("5xx : " + clientResponse.logPrefix());
            });
    }

    public WebClient.ResponseSpec putFromMap(String uri, Object body, Map<String, String> headers) {
        MultiValueMap<String, String> headerMulti = new LinkedMultiValueMap<>();
        headerMulti.setAll(headers);

        return this.put(uri, body, headerMulti);
    }

    public WebClient.ResponseSpec put(String uri, Object body, MultiValueMap<String, String> headers) {
        return webClient.put()
            .uri(uri)
            .headers(httpHeaders -> httpHeaders.addAll(headers))
            .bodyValue(body)
            .retrieve();
    }
}
