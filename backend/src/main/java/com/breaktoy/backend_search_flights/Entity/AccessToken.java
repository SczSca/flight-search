package com.breaktoy.backend_search_flights.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class AccessToken {
    private String accessToken;
    private LocalDateTime expirationDate;

}
