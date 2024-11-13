package com.breaktoy.backend_search_flights.Entity.FlightOffers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class Itineraries {
    private String duration;
    private List<Segments> segments;

}
