package com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Segments;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class Aircraft {
    private String code;
    private String name;
}
