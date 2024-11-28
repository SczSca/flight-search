package com.breaktoy.backend_search_flights.Service;

import com.breaktoy.backend_search_flights.Config.WebClientConfig;
import com.breaktoy.backend_search_flights.Entity.AccessToken;
import com.breaktoy.backend_search_flights.Entity.FlightOffers.FlightOffers;
import com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Itineraries;
import com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Segments.Operating;
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
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FlightService {
//    private final RestTemplate restTemplate;
    private final LocalFlightRepository flightRepository;
    private final WebClient webClient;

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


    public String iataItemsSetup(){
        List<String> commonIATACodes = Arrays.asList("A", "N", "L", "S");
        for(String commonCharacter: commonIATACodes){

            getAirportInformation(commonCharacter);
        }
        return "0";
    }
    public ResponseEntity<IATAResponse> returnIATAsRecommendations(String keyword){

            IATAResponse response = getAirportInformation(keyword).block();
            return new ResponseEntity<IATAResponse>(response,HttpStatus.OK);
    }

    public ResponseEntity<FlightOffersResponse> returnFlightOffers(String originLocationCode, String destinationLocationCode, String departureDate, String returnDate, Integer adults, Boolean nonStop, String currencyCode, String orderType){

        return new ResponseEntity<>(getFlightOffers(originLocationCode, destinationLocationCode, departureDate, returnDate, adults, nonStop, currencyCode, orderType), HttpStatus.OK);
    }

    private void updateAccessToken() {

        AccessTokenResponse response = webClient
                .post()
                .uri(apiUrlAccessToken)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("grant_type", "client_credentials")
                        .with("client_id", apiKey)
                        .with("client_secret", apiSecret))
                .retrieve()
                .bodyToMono(AccessTokenResponse.class)
                .block();

        String accessTokenStr = response.getAccess_token();
        int expires_in_secs = response.getExpires_in();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime newDateTime = now.plusSeconds(expires_in_secs);

        flightRepository.setAccessTokenObj(accessTokenStr, newDateTime);

    }

    private FlightOffersResponse getFlightOffers(String originLocationCode, String destinationLocationCode, String departureDate, String returnDate, Integer adults, Boolean nonStop, String currencyCode, String orderType){
        String accessTokenStr = getAccessTokenStr();

        return webClient
                .get()
                .uri(uriBuilder -> {
                    uriBuilder
                        .path(apiUrlFlightOffers)
                        .queryParam("originLocationCode", originLocationCode)
                        .queryParam("destinationLocationCode", destinationLocationCode)
                        .queryParam("departureDate",departureDate)
                        .queryParam("adults",adults)
                        .queryParam("nonStop",nonStop)
                        .queryParam("currencyCode",currencyCode)
                        .queryParam("max",10);

                    if(!returnDate.isEmpty()){
                        uriBuilder.queryParam("returnDate",returnDate);
                    }
                        return uriBuilder.build();
                })
                .header("Authorization", "Bearer " + accessTokenStr)
                .retrieve()
                .bodyToFlux(FlightOffersResponse.class)
                .flatMap(response -> {
                    List<FlightOffers> data = response.getData();
                    Dictionaries dictionaries = response.getDictionaries();
                    // async data process
                    return mountDataAsync(data, dictionaries, orderType)
                            .thenReturn(response); // return modified data
                }).blockLast();
    }



    private Mono<IATAResponse> getAirportInformation(String keyword){
        String accessTokenStr = getAccessTokenStr();
        return webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path(apiUrlIATA)
                        .queryParam("subType", "AIRPORT")
                        .queryParam("keyword", keyword)
        //                .queryParam("page[limit]","2")
        //                .queryParam("page[offset]","0")
                        .queryParam("sort","analytics.travelers.score")
                        .queryParam("view","LIGHT")
                        .build())
                .header("Authorization", "Bearer " + accessTokenStr)
                .retrieve()
                .bodyToMono(IATAResponse.class)
                .flatMap(iataResponse -> {
                    flightRepository.saveAllIATAItems(iataResponse.getData());
                    return Mono.just(iataResponse);
                });


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

    private Mono<Void> mountDataAsync(List<FlightOffers> flightOffersData, Dictionaries dictionaries, String orderType){

        HashMap<String, String> carriers = dictionaries.getCarriers();
        HashMap<String, String> aircraft = dictionaries.getAircraft();

        return Mono.fromRunnable(() -> {
            mountAirportName(dictionaries);

            if(orderType.equals("cheapest")){
                List<FlightOffers> sortedList = flightOffersData.stream().sorted(
                        (a, b) ->{

                            Float aPrice = Float.parseFloat(a.getPrice().getGrandTotal());
                            Float bPrice = Float.parseFloat(b.getPrice().getGrandTotal());
                            return Float.compare(aPrice,bPrice);
                        }
                ).toList();
                flightOffersData.clear();
                flightOffersData.addAll(sortedList);

            }else if(orderType.equals("fastest")){
                List<FlightOffers> sortedList = flightOffersData.stream().sorted(
                        (a, b) ->{

                            float aDuration = getTotalDuration(a);
                            float bDuration = getTotalDuration(b);

                            return Float.compare(aDuration,bDuration);
                        }
                ).toList();
                flightOffersData.clear();
                flightOffersData.addAll(sortedList);
            }

        })
        .publishOn(Schedulers.boundedElastic())
        .then(Mono.fromRunnable(() -> {
            Integer counter = 1;
            for(FlightOffers flightOffer: flightOffersData){
                flightOffer.setId(String.valueOf(counter));
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
                counter++;
            }
            dictionaries.setCarriers(new HashMap<>());
            dictionaries.setAircraft(new HashMap<>());
        }));
    }

    private void setAirlineName(Segments segment, HashMap<String, String> carriers){

        Operating operating = segment.getOperating();
        if(operating != null){
            String operatingCarrierCode = operating.getAirlineName();
            String operatingAirlineName = carriers.get(operatingCarrierCode);
            operating.setAirlineName(operatingAirlineName);

            String carrierCode = segment.getCarrierCode();
            String airlineName = carriers.get(carrierCode);
            segment.setAirlineName(airlineName);
        }
    }

    private void mountAirportName(Dictionaries dictionaries){

        for (String key: dictionaries.getLocations().keySet()){

            //API calls to IATA endpoint
            Optional<String> optionalAirportName = flightRepository.getAirportName(key);
            if(optionalAirportName.isEmpty()){
                IATAResponse airportInfo = getAirportInformation(key).block();
                List<IATAItem> airportInfoList = airportInfo.getData();

                if(airportInfoList != null && !airportInfoList.isEmpty()) {
                    IATAItem airportInfoItem = airportInfoList.get(0);
                    //write name of the airport in Location
                    dictionaries.getLocations().get(key).setAirportName(airportInfoItem.getDetailedName());
                }

            }else{
                String airportName = optionalAirportName.get();
                dictionaries.getLocations().get(key).setAirportName(airportName);
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
        segment.setLayoverTime(layoverTime);

    }
    private void setAircraftName(Segments segment, HashMap<String, String> aircraft){

        String aircraftCode = segment.getAircraft().getCode();
        String aircraftName = aircraft.get(aircraftCode);
        segment.getAircraft().setName(aircraftName);

    }

    private String getSubstrBetweenChars(String str, char startChar, char endChar){
        int startIndex = str.indexOf(startChar);
        int endIndex = str.indexOf(endChar, startIndex + 1);
        if (startIndex != -1 && endIndex != -1) {
            return str.substring(startIndex + 1, endIndex);
        }
        return "1";
    }

    private Float getTotalDuration(FlightOffers flightOffer){
        float flightOfferDuration = 0;
        List<Itineraries> itineraries = flightOffer.getItineraries();
        for (Itineraries itinerary : itineraries) {
            String itineraryDuration = itinerary.getDuration();
            if (itineraryDuration.contains("D")) {
                //getnumbers
                String daysNumStr = getSubstrBetweenChars(itineraryDuration, 'P', 'D');
                float daysNum = Float.parseFloat(daysNumStr);
                flightOfferDuration += daysNum * 100;
            }
            if (itineraryDuration.contains("H")) {
                String hoursNumStr = getSubstrBetweenChars(itineraryDuration, 'T', 'H');
                float hoursNum = Float.parseFloat(hoursNumStr);
                flightOfferDuration += hoursNum;
            }

            if (itineraryDuration.contains("M")) {
                String minutesNumStr = getSubstrBetweenChars(itineraryDuration, 'H', 'M');
                float minutesNum = Float.parseFloat(minutesNumStr);
                flightOfferDuration += minutesNum / 100;
            }
        }
        return flightOfferDuration;
    }
}
