package com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries;

import com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Segments.Segments;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class Itineraries {
    private String duration;
    private List<Segments> segments;

}
