package com.breaktoy.backend_search_flights.Controller;

import com.breaktoy.backend_search_flights.Entity.IATAItem;
import com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse.FlightOffersResponse;
import com.breaktoy.backend_search_flights.Service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FlightController {
    private final FlightService flightService;

    @GetMapping("/info/IATA")
    public ResponseEntity<List<IATAItem>> getIATARecommendations(
        @RequestParam(value = "keyword", required = true) String keyword
    ){
        return flightService.returnIATAsRecommendations(keyword);
    }

    @GetMapping("/search/flights")
    public ResponseEntity<FlightOffersResponse> getFlightOffers(
            @RequestParam(value = "originLocationCode", required = true) String originLocationCode,
            @RequestParam(value = "destinationLocationCode", required = true) String destinationLocationCode,
            @RequestParam(value = "departureDate", required = true) String departureDate,
            @RequestParam(value = "returnDate", required = true) String returnDate,
            @RequestParam(value = "adults", required = true) Integer adults,
            @RequestParam(value = "nonStop", required = true) Boolean nonStop,
            @RequestParam(value = "currencyCode", required = true) String currencyCode
    ){
        return flightService.returnFlightOffers(originLocationCode,destinationLocationCode,departureDate,returnDate,adults,nonStop,currencyCode);
    }

}
