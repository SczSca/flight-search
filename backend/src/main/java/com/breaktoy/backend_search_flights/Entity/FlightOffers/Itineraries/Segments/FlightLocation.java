package com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Segments;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class FlightLocation {
    private String iataCode;
    private String airportName;
    private String terminal;
    private String at;
}
