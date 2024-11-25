package com.breaktoy.backend_search_flights.Entity.FlightOffers.Itineraries.Segments;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class Segments {
    private FlightLocation departure;
    private FlightLocation arrival;
    private String carrierCode;
    private String airlineName;
    private String number;
    private Aircraft aircraft;
    private Operating operating;
    private String duration;
    private String layoverTime;
    private String id;
}
