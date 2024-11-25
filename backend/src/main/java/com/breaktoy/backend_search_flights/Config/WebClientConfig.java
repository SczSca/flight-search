package com.breaktoy.backend_search_flights.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {
    @Value("${API_URL_ACCESS_TOKEN}")
    private String apiUrlAccessToken;

    @Value("${API_URL_IATA}")
    private String apiUrlIATA;

    @Value("${API_URL_FLIGHT_OFFERS}")
    private String apiUrlFlightOffers;

    @Value("${API_KEY}")
    private String apiKey;

    @Value("${API_SECRET}")
    private String apiSecret;

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}

