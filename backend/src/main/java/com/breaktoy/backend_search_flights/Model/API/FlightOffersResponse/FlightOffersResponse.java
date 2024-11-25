package com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse;

import com.breaktoy.backend_search_flights.Entity.FlightOffers.FlightOffers;
import com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse.Dictionaries.Dictionaries;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@RequiredArgsConstructor
public class FlightOffersResponse {
    @JsonProperty("data")
    private List<FlightOffers> data;
    private Dictionaries dictionaries;

}
