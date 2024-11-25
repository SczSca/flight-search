package com.breaktoy.backend_search_flights.Repository;

import com.breaktoy.backend_search_flights.Entity.AccessToken;
import com.breaktoy.backend_search_flights.Entity.Destination;
import com.breaktoy.backend_search_flights.Entity.IATAItem;
import com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse.FlightOffersResponse;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Repository
public class LocalFlightRepository implements FlightRepository{
    private AccessToken accessTokenObj = AccessToken.builder()
                .accessToken("")
                .expirationDate(LocalDateTime.now())
                .build();
    private final HashMap<String, Destination> flights = new HashMap<>();
    private final HashMap<String, IATAItem> airportInfo = new HashMap<>();

    public void saveAirportInfo(String IATACode, IATAItem iataItem){
        airportInfo.put(IATACode,iataItem);
    }

    public void saveAllIATAItems(List<IATAItem> iataItems){
        for(IATAItem iataItem: iataItems){
            String iataCode = iataItem.getIataCode();

            if(findIATAItem(iataCode).isEmpty()){
                saveAirportInfo(iataCode,iataItem);
            }
        }
    }

    public String saveFlightResult(String originLocationCode,String destinationLocationCode, FlightOffersResponse flightResults){
        HashMap<String, FlightOffersResponse> flightResultsMap = new HashMap<>();
        flightResultsMap.put(destinationLocationCode,flightResults);

        Destination destination = Destination.builder()
                .flightResults(flightResultsMap)
                .build();

        flights.put(originLocationCode,destination);
        return "0";
    }



    @Override
    public void setAccessTokenObj(String newAccessTokenStr, LocalDateTime newExpirationDate) {
        accessTokenObj.setAccessToken(newAccessTokenStr);
        accessTokenObj.setExpirationDate(newExpirationDate);
    }

    @Override
    public AccessToken getAccessTokenObj() {
        return accessTokenObj;
    }

    @Override
    public Optional<IATAItem> findIATAItem(String iataCode) {
        return Optional.ofNullable(airportInfo.get(iataCode));
    }

    @Override
    public Optional<String> getAirportName(String iataCode){
        Optional<IATAItem> iataItem = findIATAItem(iataCode);
        return iataItem.map(IATAItem::getDetailedName);
    }
}
