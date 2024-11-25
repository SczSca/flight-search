package com.breaktoy.backend_search_flights.Entity;

import com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse.FlightOffersResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
@Builder
public class Destination {
    private HashMap<String, FlightOffersResponse> flightResults;
}
