package com.breaktoy.backend_search_flights.Config;

import com.breaktoy.backend_search_flights.Service.FlightService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StartUp {

    private final FlightService flightService;


    @PostConstruct
    public void init() {
        flightService.iataItemsSetup();
    }
}