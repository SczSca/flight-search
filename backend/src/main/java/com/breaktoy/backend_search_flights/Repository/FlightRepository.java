package com.breaktoy.backend_search_flights.Repository;

import com.breaktoy.backend_search_flights.Entity.AccessToken;

import java.time.LocalDateTime;
import java.util.Optional;

public interface FlightRepository {

    Optional<String> findIATAsCode(String keyword);
    Void setAccessTokenObj(String newAccessTokenStr, LocalDateTime newExpirationDate);
    AccessToken getAccessTokenObj();
}
