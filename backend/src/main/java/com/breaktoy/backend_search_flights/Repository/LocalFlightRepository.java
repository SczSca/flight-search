package com.breaktoy.backend_search_flights.Repository;

import com.breaktoy.backend_search_flights.Entity.AccessToken;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public class LocalFlightRepository implements FlightRepository{
    private AccessToken accessTokenObj = AccessToken.builder()
                .accessToken("")
                .expirationDate(LocalDateTime.now())
                .build();


    @Override
    public Void setAccessTokenObj(String newAccessTokenStr, LocalDateTime newExpirationDate) {
//        AccessToken newAccessToken = AccessToken.builder()
//                .accessToken(newAccessTokenStr)
//                .expirationDate(newExpirationDate)
//                .build();
//        accessTokenObj = newAccessToken;
        accessTokenObj.setAccessToken(newAccessTokenStr);
        accessTokenObj.setExpirationDate(newExpirationDate);
        return null;
    }

    @Override
    public AccessToken getAccessTokenObj() {
        return accessTokenObj;
    }
    @Override
    public Optional<String> findIATAsCode(String keyword) {
        return Optional.empty();
    }
}
