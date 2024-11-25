package com.breaktoy.backend_search_flights.Repository;

import com.breaktoy.backend_search_flights.Entity.AccessToken;
import com.breaktoy.backend_search_flights.Entity.IATAItem;

import java.time.LocalDateTime;
import java.util.Optional;

public interface FlightRepository {
    void saveAirportInfo(String IATACode, IATAItem iataItem);
    Optional<IATAItem> findIATAItem(String iataCode);
    Optional<String> getAirportName(String iataCode);
    void setAccessTokenObj(String newAccessTokenStr, LocalDateTime newExpirationDate);
    AccessToken getAccessTokenObj();
}
