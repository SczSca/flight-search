package com.breaktoy.backend_search_flights.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Value("${API_URL_BASE}")
    private String apiUrlBase;

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder
                .defaultHeader("Content-Type", "application/json")
                .baseUrl(apiUrlBase)
                .build();
    }

}

