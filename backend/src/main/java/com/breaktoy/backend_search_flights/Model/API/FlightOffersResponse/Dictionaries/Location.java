package com.breaktoy.backend_search_flights.Model.API.FlightOffersResponse.Dictionaries;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@Getter
public class Location {
    private String cityCode;
    private String countryCode;
}
