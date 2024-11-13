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
        String uri = UriComponentsBuilder.fromHttpUrl(apiUrlFlightOffers)
                .queryParam("originLocationCode", originLocationCode)
                .queryParam("destinationLocationCode", destinationLocationCode)
                .queryParam("departureDate",departureDate)
                .queryParam("returnDate",returnDate)
                .queryParam("adults",adults)
                .queryParam("nonStop",nonStop)
                .queryParam("currencyCode",currencyCode)
                .queryParam("max",30)
                .toUriString();
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        String jsonResponse = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            FlightOffersResponse iataResponse = objectMapper.readValue(jsonResponse, FlightOffersResponse.class);
            List<FlightOffers> data = iataResponse.getData();
            Dictionaries dictionaries = iataResponse.getDictionaries();
            mountData(data, dictionaries);
            return new ResponseEntity<FlightOffersResponse>(iataResponse,HttpStatus.OK);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private List<IATAItem> getAirportInformation(String keyword){

        HttpHeaders headers = new HttpHeaders();

        String accessTokenStr = getAccessTokenStr();

        headers.setBearerAuth(accessTokenStr);
        String uri = UriComponentsBuilder.fromHttpUrl(apiUrlIATA)
                .queryParam("subType", "AIRPORT")
                .queryParam("keyword", keyword)
//                .queryParam("page[limit]","2")
//                .queryParam("page[offset]","0")
                .queryParam("sort","analytics.travelers.score")
                .queryParam("view","LIGHT")
                .toUriString();
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        String jsonResponse = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            IATAResponse iataResponse = objectMapper.readValue(jsonResponse, IATAResponse.class);
            return iataResponse.getData();
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

    private void mountData(List<FlightOffers> flightOffersData, Dictionaries dictionaries){

        HashMap<String, String> carriers = dictionaries.getCarriers();
        HashMap<String, String> aircraft = dictionaries.getAircraft();

        mountAirportName(dictionaries);


        for(FlightOffers flightOffer: flightOffersData){
            List<Itineraries> itinerariesList = flightOffer.getItineraries();
            for(Itineraries itinerary: itinerariesList){

                List<Segments> segmentsList = itinerary.getSegments();
                //assigning props value to first segment
                Segments firstSegment = segmentsList.get(0);

                setAirlineName(firstSegment, carriers);
                setAircraftName(firstSegment,aircraft);
                //Starting with the second segment due to setLayoverTime logic which needs departureDate from i and arrivalDate from i-1
                for(int i = 1; i < segmentsList.size(); i++){
                    Segments segment = segmentsList.get(i);
                    Segments previousSegment = segmentsList.get(i - 1);
                    //set layoverTime
                    setLayoverTime(segment, segment.getDeparture().getAt(), previousSegment.getArrival().getAt() );
                    //set operating airline name
                    setAirlineName(segment,carriers);
                    setAircraftName(segment, aircraft);

                }
            }
        }
        dictionaries.setCarriers(new HashMap<>());
        dictionaries.setAircraft(new HashMap<>());
    }

    private void setAirlineName(Segments segment, HashMap<String, String> carriers){

        String operatingCarrierCode = segment.getOperating().getCarrierCode();
        String operatingAirlineName = carriers.get(operatingCarrierCode);
        segment.getOperating().setAirlineName(operatingAirlineName);

        String carrierCode = segment.getCarrierCode();
        String airlineName = carriers.get(carrierCode);
        segment.setAirlineName(airlineName);
    }

    private void mountAirportName(Dictionaries dictionaries){

        for (String key: dictionaries.getLocations().keySet()){

            //API calls to IATA endpoint
            List<IATAItem> airportInfoList = getAirportInformation(key);

            if(airportInfoList != null && !airportInfoList.isEmpty()){
            IATAItem airportInfoItem = airportInfoList.get(0);
            //write name of the airport in Location
            dictionaries.getLocations().get(key).setAirportName(airportInfoItem.getDetailedName());
            }
        }
    }

    private void setLayoverTime(Segments segment, String departureTime, String arrivalTime){

        LocalDateTime dateTimeDeparture = LocalDateTime.parse(departureTime);
        LocalDateTime dateTimeArrival = LocalDateTime.parse(arrivalTime);

        Duration duration = Duration.between(dateTimeArrival,dateTimeDeparture);

        long days = duration.toDaysPart();
        int hours = duration.toHoursPart();
        int minutes = duration.toMinutesPart();
        String layoverTime = "P" + days + "DT" + hours + "H" + minutes + "M"; //e.g. P2DT15H20M
        System.out.println(layoverTime);
        segment.setLayoverTime(layoverTime);

    }
    private void setAircraftName(Segments segment, HashMap<String, String> aircraft){

        String aircraftCode = segment.getAircraft().getCode();
        String aircraftName = aircraft.get(aircraftCode);
        segment.getAircraft().setName(aircraftName);

    }
}
