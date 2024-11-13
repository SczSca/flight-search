package com.breaktoy.backend_search_flights.Service;

import com.breaktoy.backend_search_flights.Entity.AccessToken;
import com.breaktoy.backend_search_flights.Entity.FlightOffers.FlightOffers;
import com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Itineraries;
import com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Segments.Segments;
import com.breaktoy.backend_search_flights.Entity.IATAItem;
import com.breaktoy.backend_search_flights.Model.API.AccessTokenResponse;
import com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse.Dictionaries.Dictionaries;
import com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse.FlightOffersResponse;
import com.breaktoy.backend_search_flights.Model.API.IATAResponse;
import com.breaktoy.backend_search_flights.Repository.LocalFlightRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FlightService {
    private final RestTemplate restTemplate;
    private final LocalFlightRepository flightRepository;

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

    private void updateAccessToken() {

        System.out.println(apiUrlAccessToken);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");
        body.add("client_id", apiKey);
        body.add("client_secret", apiSecret);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<AccessTokenResponse> response = restTemplate.exchange(apiUrlAccessToken, HttpMethod.POST, entity, AccessTokenResponse.class);
        String accessTokenStr = response.getBody().getAccess_token();
        int expires_in_secs = response.getBody().getExpires_in();

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime newDateTime = now.plusSeconds(expires_in_secs);


        flightRepository.setAccessTokenObj(accessTokenStr, newDateTime);

    }

    public ResponseEntity<List<IATAItem>> returnIATAsRecommendations(String keyword){

            return new ResponseEntity<List<IATAItem>>(getAirportInformation(keyword),HttpStatus.OK);
    }

    public ResponseEntity<FlightOffersResponse> returnFlightOffers(String originLocationCode, String destinationLocationCode, String departureDate, String returnDate, Integer adults, Boolean nonStop, String currencyCode){
        HttpHeaders headers = new HttpHeaders();

        String accessTokenStr = getAccessTokenStr();
        System.out.println(accessTokenStr);

        headers.setBearerAuth(accessTokenStr);
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        String uri = UriComponentsBuilder.fromHttpUrl(apiUrlIATA)
                .queryParam("subType", "AIRPORT")
                .queryParam("keyword", keyword)
//                .queryParam("page[limit]","2")
//                .queryParam("page[offset]","0")
//                .queryParam("sort","analytics.travelers.score")
                .queryParam("view","LIGHT")
                .toUriString();
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        String jsonResponse = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            IATAResponse iataResponse = objectMapper.readValue(jsonResponse, IATAResponse.class);
            List<IATAItem> data = iataResponse.getData();
            for(IATAItem datajson: data){
                System.out.println(datajson.getIataCode());
            }
            return new ResponseEntity<List<IATAItem>>(data,HttpStatus.ACCEPTED);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    private Boolean isAccessTokenExpired(LocalDateTime expirationDate){
        LocalDateTime now = LocalDateTime.now();
        return expirationDate.isBefore(now);
    }

    private String getAccessTokenStr(){
        //gets expiration date
        AccessToken accessTokenObj = flightRepository.getAccessTokenObj();
        LocalDateTime expirationDate = accessTokenObj.getExpirationDate();

        //if it is expired, update the access token
        if(isAccessTokenExpired(expirationDate)){
            updateAccessToken();
            accessTokenObj = flightRepository.getAccessTokenObj();
        }
        return accessTokenObj.getAccessToken();
    }
}
